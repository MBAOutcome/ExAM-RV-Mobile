package org.apache.cordova.twiliovideo;

import android.content.Context;
import android.graphics.Rect;
import android.hardware.Camera;
import android.hardware.camera2.CameraMetadata;
import android.hardware.camera2.CaptureRequest;
import android.os.Build;
import android.util.Log;
import android.util.Pair;

import androidx.annotation.NonNull;

import com.twilio.video.Camera2Capturer;
import com.twilio.video.CameraCapturer;
import com.twilio.video.CameraParameterUpdater;
import com.twilio.video.CaptureRequestUpdater;
import com.twilio.video.VideoCapturer;

import tvi.webrtc.Camera2Enumerator;

/*
 * Simple wrapper class that uses Camera2Capturer with supported devices.
 */
public class CameraCapturerCompat {

    private CameraCapturer camera1Capturer;
    private Camera2Capturer camera2Capturer;
    private Pair<CameraCapturer.CameraSource, String> frontCameraPair;
    private Pair<CameraCapturer.CameraSource, String> backCameraPair;
    public float previousvalue = 0.0f;
    private final Camera2Capturer.Listener camera2Listener = new Camera2Capturer.Listener() {
        @Override
        public void onFirstFrameAvailable() {
            Log.i(TwilioVideo.TAG, "onFirstFrameAvailable");
        }

        @Override
        public void onCameraSwitched(String newCameraId) {
            Log.i(TwilioVideo.TAG, "onCameraSwitched: newCameraId = " + newCameraId);
        }

        @Override
        public void onError(Camera2Capturer.Exception camera2CapturerException) {
            Log.e(TwilioVideo.TAG, camera2CapturerException.getMessage());
        }
    };

    public CameraCapturerCompat(Context context,
                                CameraCapturer.CameraSource cameraSource) {
        if (Camera2Capturer.isSupported(context)) {
            setCameraPairs(context);
            camera2Capturer = new Camera2Capturer(context,
                    getCameraId(cameraSource),
                    camera2Listener);


        } else {
            camera1Capturer = new CameraCapturer(context, cameraSource);

        }
    }

    public CameraCapturer.CameraSource getCameraSource() {
        if (usingCamera1()) {
            return camera1Capturer.getCameraSource();
        } else {
            return getCameraSource(camera2Capturer.getCameraId());
        }
    }

    public void switchCamera() {
        if (usingCamera1()) {
            camera1Capturer.switchCamera();
        } else {
            CameraCapturer.CameraSource cameraSource = getCameraSource(camera2Capturer
                    .getCameraId());

            if (cameraSource == CameraCapturer.CameraSource.FRONT_CAMERA) {
                camera2Capturer.switchCamera(backCameraPair.second);
            } else {
                camera2Capturer.switchCamera(frontCameraPair.second);
            }
        }
    }

    /*
     * This method is required because this class is not an implementation of VideoCapturer due to
     * a shortcoming in the Video Android SDK.
     */
    public VideoCapturer getVideoCapturer() {
        if (usingCamera1()) {
            return camera1Capturer;
        } else {
            return camera2Capturer;
        }
    }

    public boolean usingCamera1() {
        return camera1Capturer != null;
    }

    private void setCameraPairs(Context context) {
        Camera2Enumerator camera2Enumerator = new Camera2Enumerator(context);
        for (String cameraId : camera2Enumerator.getDeviceNames()) {
            if (camera2Enumerator.isFrontFacing(cameraId)) {
                frontCameraPair = new Pair<>(CameraCapturer.CameraSource.FRONT_CAMERA, cameraId);
            }
            if (camera2Enumerator.isBackFacing(cameraId)) {
                backCameraPair = new Pair<>(CameraCapturer.CameraSource.BACK_CAMERA, cameraId);
            }
        }
    }

    public String getCameraId(CameraCapturer.CameraSource cameraSource) {
        if (frontCameraPair.first == cameraSource) {
            return frontCameraPair.second;
        } else {
            return backCameraPair.second;
        }
    }

    private CameraCapturer.CameraSource getCameraSource(String cameraId) {
        if (frontCameraPair.second.equals(cameraId)) {
            return frontCameraPair.first;
        } else {
            return backCameraPair.first;
        }
    }

    public void TurnONFlash() {

        if (usingCamera1()) {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {

                Log.i(TwilioVideo.TAG, "TurnONFlash 11 " );

                camera2Capturer.updateCaptureRequest(
                        new CaptureRequestUpdater() {

                            public void apply(@NonNull CaptureRequest.Builder captureRequestBuilder) {
                                captureRequestBuilder.set(CaptureRequest.FLASH_MODE, CameraMetadata.FLASH_MODE_TORCH);

                            }
                        }
                );

            }else{
                Log.i(TwilioVideo.TAG, "TurnONFlash 22 " );

                camera1Capturer.updateCameraParameters(new CameraParameterUpdater() {
                    public void apply(Camera.Parameters cameraParameters) {
                        if (cameraParameters.getFlashMode() != null) {
                            cameraParameters.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);

                        }
                    }
                });
            }

        } else {

            camera2Capturer.updateCaptureRequest(
                    new CaptureRequestUpdater() {

                        public void apply(@NonNull CaptureRequest.Builder captureRequestBuilder) {
                            Log.i(TwilioVideo.TAG, "TurnONFlash cccc " );
                            captureRequestBuilder.set(CaptureRequest.FLASH_MODE, CameraMetadata.FLASH_MODE_TORCH);

                        }
                    }
            );
        }

    }

    public void TurnOffFlash() {

        if (usingCamera1()) {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {

                camera2Capturer.updateCaptureRequest(
                        new CaptureRequestUpdater() {

                            public void apply(@NonNull CaptureRequest.Builder captureRequestBuilder) {
                                captureRequestBuilder.set(CaptureRequest.FLASH_MODE, CameraMetadata.FLASH_MODE_OFF);

                            }
                        }
                );

            } else {
                camera1Capturer.updateCameraParameters(new CameraParameterUpdater() {
                    public void apply(Camera.Parameters cameraParameters) {
                        if (cameraParameters.getFlashMode() != null) {
                            cameraParameters.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
                        }
                    }
                });
            }
        } else {
            camera2Capturer.updateCaptureRequest(
                    new CaptureRequestUpdater() {


                        public void apply(@NonNull CaptureRequest.Builder captureRequestBuilder) {
                            Log.i(TwilioVideo.TAG, "TurnONFlash fff " );

                            captureRequestBuilder.set(CaptureRequest.FLASH_MODE, CameraMetadata.FLASH_MODE_OFF);

                        }
                    }
            );
        }

    }

    public void setZoomforOld(float mDist,float newDist, boolean istourchenable) {

        camera1Capturer.updateCameraParameters(new CameraParameterUpdater() {

            public void apply(Camera.Parameters cameraParameters) {
                int maxZoom = cameraParameters.getMaxZoom();
                int zoom = cameraParameters.getZoom();
                //float newDist = getFingerSpacing(event);
                float tempmDist=mDist;
                if (newDist > tempmDist) {
                 //zoom in
                    if (zoom < maxZoom)
                        zoom+=5;
                } else if (newDist < tempmDist) {
                 //zoom out
                    if (zoom > 0)
                        zoom-=5;
                }
                tempmDist = newDist;
                cameraParameters.setZoom(zoom);
                // if(a < maxZoom) {
                //cameraParameters.setZoom(zoom);

                // }
                if (cameraParameters.getFlashMode() != null && istourchenable) {
                    cameraParameters.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);

                }

            }
        });

    }

    public void setZoomfornew(Rect a, boolean istourchenable) {
         camera2Capturer.updateCaptureRequest(new CaptureRequestUpdater() {

                public void apply(@NonNull CaptureRequest.Builder captureRequestBuilder) {
                    captureRequestBuilder.set(CaptureRequest.SCALER_CROP_REGION, a);
                    if(istourchenable){
                        captureRequestBuilder.set(CaptureRequest.FLASH_MODE, CameraMetadata.FLASH_MODE_TORCH);
                    }
                }
         });
    }

    public String getcurrentcameraFacingId() {
        return camera2Capturer.getCameraId();
    }


}
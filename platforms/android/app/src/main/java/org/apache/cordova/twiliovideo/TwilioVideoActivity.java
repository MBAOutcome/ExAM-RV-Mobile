package org.apache.cordova.twiliovideo;

import android.Manifest;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.graphics.Rect;
import android.hardware.Camera;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCaptureSession;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraDevice;
import android.hardware.camera2.CameraManager;
import android.hardware.camera2.CameraMetadata;
import android.hardware.camera2.CaptureRequest;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.NonNull;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.appcompat.app.AppCompatActivity;

import android.util.Log;
import android.view.Menu;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.view.View;

import com.twilio.video.Camera2Capturer;
import com.twilio.video.CameraCapturer;
import com.twilio.video.CameraCapturer.CameraSource;
import com.twilio.video.ConnectOptions;
import com.twilio.video.LocalAudioTrack;
import com.twilio.video.LocalAudioTrackPublication;
import com.twilio.video.LocalDataTrack;
import com.twilio.video.LocalDataTrackPublication;
import com.twilio.video.LocalParticipant;
import com.twilio.video.LocalVideoTrack;
import com.twilio.video.LocalVideoTrackPublication;
import com.twilio.video.NetworkQualityLevel;
import com.twilio.video.RemoteAudioTrack;
import com.twilio.video.RemoteAudioTrackPublication;
import com.twilio.video.RemoteDataTrack;
import com.twilio.video.RemoteDataTrackPublication;
import com.twilio.video.RemoteParticipant;
import com.twilio.video.RemoteVideoTrack;
import com.twilio.video.RemoteVideoTrackPublication;
import com.twilio.video.Room;
import com.twilio.video.TwilioException;
import com.twilio.video.Video;
import com.twilio.video.VideoRenderer;
import com.twilio.video.VideoTextureView;
import com.twilio.video.VideoTrack;
import com.twilio.video.VideoView;

import org.apache.cordova.LOG;
import org.json.JSONObject;

import java.util.Collections;
import java.util.List;

//Added for custom logic
import android.view.Window;
import android.view.animation.TranslateAnimation;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.view.animation.Animation;
import android.view.TextureView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import io.ionic.starter.R;

import static org.apache.cordova.twiliovideo.TwilioVideo.TAG;


public class TwilioVideoActivity extends AppCompatActivity implements CallActionObserver {

    /*
     * Audio and video tracks can be created with names. This feature is useful for categorizing
     * tracks of participants. For example, if one participant publishes a video track with
     * ScreenCapturer and CameraCapturer with the names "screen" and "camera" respectively then
     * other participants can use RemoteVideoTrack#getName to determine which video track is
     * produced from the other participant's screen or camera.
     */
    private static final String LOCAL_AUDIO_TRACK_NAME = "microphone";
    private static final String LOCAL_VIDEO_TRACK_NAME = "camera";

    private static final int PERMISSIONS_REQUEST_CODE = 1;
    private static final String TAG = "twilio";

    private static FakeR FAKE_R;

    /*
     * Access token used to connect. This field will be set either from the console generated token
     * or the request to the token server.
     */
    private String accessToken;
    private String roomId;
    private CallConfig config;

    /*
     * A Room represents communication between a local participant and one or more participants.
     */
    private Room room;
    private LocalParticipant localParticipant;

    /*
     * A VideoView receives frames from a local or remote video track and renders them
     * to an associated view.
     */
    private VideoView primaryVideoView;
    private VideoView thumbnailVideoView;
    private VideoTextureView primaryVideoView1;

    /*
     * Android application UI elements
     */
    private CameraCapturerCompat cameraCapturer;
    private LocalAudioTrack localAudioTrack;
    private LocalVideoTrack localVideoTrack;
    private FloatingActionButton connectActionFab;
    private FloatingActionButton switchCameraActionFab;
    private FloatingActionButton localVideoActionFab;
    private FloatingActionButton muteActionFab;
    private FloatingActionButton switchAudioActionFab;
    private FloatingActionButton switchFlashFab;
    private AudioManager audioManager;
    private String participantIdentity;

    private int previousAudioMode;
    private boolean previousMicrophoneMute;
    private boolean disconnectedFromOnDestroy;
    private boolean isflashon;

    private VideoRenderer localVideoView;

    //Added custom parameter
    private LocalDataTrack localDataTrack;
    private ImageView windowImageview;
    private ImageView primaryImageview;
    public static boolean isprimaryView = false;
    private FrameLayout thumnailborderlayout;



    private ScaleGestureDetector mScaleGestureDetector;
    private float mScaleFactor = 1.0f;
    private CameraManager camManager;
    private FloatingActionButton MenuActionFab;
    private FloatingActionButton CloseActionFab;

    private LinearLayout menu_list;
    private ImageView Imageiconview;

    private RelativeLayout headerview;
    private TextView headertext;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        TwilioVideoManager.getInstance().setActionListenerObserver(this);

        FAKE_R = new FakeR(this);

        publishEvent(CallEvent.OPENED);
        setContentView(FAKE_R.getLayout("activity_video"));
        primaryVideoView1 = findViewById(FAKE_R.getId("primary_video_view1"));

        primaryVideoView = findViewById(FAKE_R.getId("primary_video_view"));
        thumbnailVideoView = findViewById(FAKE_R.getId("thumbnail_video_view"));
        thumnailborderlayout = findViewById(FAKE_R.getId("thumbnail_video_viewlayout"));

        connectActionFab = findViewById(FAKE_R.getId("connect_action_fab"));
        switchCameraActionFab = findViewById(FAKE_R.getId("switch_camera_action_fab"));
        localVideoActionFab = findViewById(FAKE_R.getId("local_video_action_fab"));
        muteActionFab = findViewById(FAKE_R.getId("mute_action_fab"));
        switchAudioActionFab = findViewById(FAKE_R.getId("switch_audio_action_fab"));
        switchFlashFab = findViewById(FAKE_R.getId("flash_action_fab"));

        MenuActionFab = findViewById(FAKE_R.getId("menu_action"));
        menu_list = findViewById(FAKE_R.getId("menu_list"));
        CloseActionFab = findViewById(FAKE_R.getId("closeaction_fab"));
        Imageiconview = findViewById(FAKE_R.getId("imageicon"));

        headerview = findViewById(FAKE_R.getId("headerview"));
        headertext = findViewById(FAKE_R.getId("headertext"));

         /*
         * Enable changing the volume using the up/down keys during a conversation
         */
        setVolumeControlStream(AudioManager.STREAM_VOICE_CALL);
        /*
         * Needed for setting/abandoning audio focus during call
         */
        // Added for status bar color --custom
        Window window = TwilioVideoActivity.this.getWindow();


        audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
        audioManager.setSpeakerphoneOn(true);
        mScaleGestureDetector = new ScaleGestureDetector(this, new ScaleListener());
        //Added for data tracking
        // localDataTrack = LocalDataTrack.create(TwilioVideoActivity.this);

        Intent intent = getIntent();

        this.accessToken = intent.getStringExtra("token");
        this.roomId = intent.getStringExtra("roomId");
        this.config = (CallConfig) intent.getSerializableExtra("config");
        Log.d(TwilioVideo.TAG, "BEFORE REQUEST PERMISSIONS");
        if (!hasPermissionForCameraAndMicrophone()) {
            Log.d(TwilioVideo.TAG, "REQUEST PERMISSIONS");
            requestPermissions();
        } else {
            Log.d(TwilioVideo.TAG, "PERMISSIONS OK. CREATE LOCAL MEDIA");
            createAudioAndVideoTracks();
            connectToRoom();
        }
        /*
         * Set the initial state of the UI
         */
        Log.i(TAG, "getheaderBtnTextColor" + config.getheaderBtnTextColor());

        if(headertext != null && config.getheaderValue() != null){

            headertext.setVisibility(View.VISIBLE);
            headertext.setText(config.getheaderValue());

            if(config.getheaderBtnTextColor() != null){
                headertext.setTextColor(Color.parseColor(config.getheaderBtnTextColor()));
                MenuActionFab.setColorFilter(Color.parseColor(config.getheaderBtnTextColor()));
            }
        }

        if(config.getschemacolor() !=null){

            if(headerview != null){
                    headerview.setBackgroundColor(Color.parseColor(config.getschemacolor()));
            }


           // MenuActionFab.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor(config.getschemacolor())));
            window.setStatusBarColor(Color.parseColor(config.getschemacolor()));
        }
        Log.i(TAG, "getschemacolor" + config.getschemacolor());

        initializeUI();
        isprimaryView = false;

    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        if (requestCode == PERMISSIONS_REQUEST_CODE) {
            boolean permissionsGranted = true;

            for (int grantResult : grantResults) {
                permissionsGranted &= grantResult == PackageManager.PERMISSION_GRANTED;
            }

            if (permissionsGranted) {
                createAudioAndVideoTracks();
                connectToRoom();
            } else {
                publishEvent(CallEvent.PERMISSIONS_REQUIRED);
                TwilioVideoActivity.this.handleConnectionError("Permission required for Camera and Microphone access");
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        /*
         * If the local video track was released when the app was put in the background, recreate.
         */
        if (localVideoTrack == null && hasPermissionForCameraAndMicrophone()) {
            localVideoTrack = LocalVideoTrack.create(this,
                    true,
                    cameraCapturer.getVideoCapturer(),
                    LOCAL_VIDEO_TRACK_NAME);

            if (isprimaryView) {
                localVideoTrack.removeRenderer(primaryVideoView);
                localVideoTrack.addRenderer(thumbnailVideoView);
                // thumnailborderlayout.setVisibility(View.VISIBLE);
            } else {
                // thumnailborderlayout.setVisibility(View.GONE);
                localVideoTrack.removeRenderer(thumbnailVideoView);
                localVideoTrack.addRenderer(primaryVideoView);
            }
            if(iscameraFlashAvailable()) {
                switchFlashFab.show();
                isflashon = false;
                int icon;
                icon = FAKE_R.getDrawable("flashoff");
                switchFlashFab.setImageDrawable(ContextCompat.getDrawable(TwilioVideoActivity.this, icon));

            }
            /*
             * If connected to a Room then share the local video track.
             */
            if (localParticipant != null) {
                localParticipant.publishTrack(localVideoTrack);
            }
        }
    }


    @Override
    protected void onPause() {
        /*
         * Release the local video track before going in the background. This ensures that the
         * camera can be used by other applications while this app is in the background.
         */
        if (localVideoTrack != null) {
            /*
             * If this local video track is being shared in a Room, unpublish from room before
             * releasing the video track. Participants will be notified that the track has been
             * unpublished.
             */
            if (localParticipant != null) {
                localParticipant.unpublishTrack(localVideoTrack);
            }

            localVideoTrack.release();
            localVideoTrack = null;
        }
        super.onPause();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        overridePendingTransition(0, 0);

    }

    @Override
    protected void onDestroy() {

        /*
         * Always disconnect from the room before leaving the Activity to
         * ensure any memory allocated to the Room resource is freed.
         */
        if (room != null && room.getState() != Room.State.DISCONNECTED) {
            room.disconnect();
            disconnectedFromOnDestroy = true;
        }

        /*
         * Release the local audio and video tracks ensuring any memory allocated to audio
         * or video is freed.
         */
        if (localAudioTrack != null) {
            localAudioTrack.release();
            localAudioTrack = null;
        }
        if (localVideoTrack != null) {
            localVideoTrack.release();
            localVideoTrack = null;
        }

        //if (localDataTrack != null) {
        //     localDataTrack.release();
        //      localDataTrack = null;
        //  }
        publishEvent(CallEvent.CLOSED);

        TwilioVideoManager.getInstance().setActionListenerObserver(null);

        super.onDestroy();
    }

    private boolean hasPermissionForCameraAndMicrophone() {
        int resultCamera = ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA);
        int resultMic = ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO);
        return resultCamera == PackageManager.PERMISSION_GRANTED &&
                resultMic == PackageManager.PERMISSION_GRANTED;
    }

    private void requestPermissions() {
        ActivityCompat.requestPermissions(
                this,
                TwilioVideo.PERMISSIONS_REQUIRED,
                PERMISSIONS_REQUEST_CODE);

    }
    // Adde to check flash available for front/back camera
    public boolean  iscameraFlashAvailable() {

        CameraSource cameraSource = cameraCapturer.getCameraSource();
        boolean hasFlash = getApplicationContext().getPackageManager()
                .hasSystemFeature(PackageManager.FEATURE_CAMERA_FLASH);
        boolean flashAvailable = false;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            try {
                camManager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);

                if (camManager != null) {

                    for(String id : camManager.getCameraIdList()){
                        CameraCharacteristics cameraCharacteristics = camManager.getCameraCharacteristics(id);
                        Integer facing = cameraCharacteristics.get(CameraCharacteristics.LENS_FACING);
                        if (facing != null && facing == CameraCharacteristics.LENS_FACING_FRONT && (cameraCapturer.getCameraSource() == CameraSource.FRONT_CAMERA)) {
                            flashAvailable = false;// cameraCharacteristics.get(CameraCharacteristics.FLASH_INFO_AVAILABLE).booleanValue();
                            Log.i(TAG, " inside 111111Camara flashAvailable id "+(cameraCapturer.getCameraSource() == CameraSource.FRONT_CAMERA) + cameraCapturer.getCameraId(cameraSource));
                            break;
                        }else{
                            flashAvailable = true;
                        }

                    }
                     Log.i(TAG, "Camara flashAvailable id " + flashAvailable);
                }
            } catch (CameraAccessException e) {
                Log.e(TAG, e.toString());
            }
        }
        return flashAvailable && hasFlash;
    }


    private void createAudioAndVideoTracks() {
        // Share your microphone
        localAudioTrack = LocalAudioTrack.create(this, true, LOCAL_AUDIO_TRACK_NAME);
        cameraCapturer = new CameraCapturerCompat(this, getAvailableCameraSource());
        localVideoTrack = LocalVideoTrack.create(this,
                true,
                cameraCapturer.getVideoCapturer(),
                LOCAL_VIDEO_TRACK_NAME);
        this.moveLocalVideoToThumbnailView();


    }

    private CameraSource getAvailableCameraSource() {

        return (CameraCapturer.isSourceAvailable(CameraSource.FRONT_CAMERA)) ?
                (CameraSource.FRONT_CAMERA) :
                (CameraSource.BACK_CAMERA);

    }

    private void connectToRoom() {
        configureAudio(true);
        ConnectOptions.Builder connectOptionsBuilder = new ConnectOptions.Builder(accessToken)
                .roomName(this.roomId)
                .enableIceGatheringOnAnyAddressPorts(true);

        /*
         * Add local audio track to connect options to share with participants.
         */
        if (localAudioTrack != null) {
            connectOptionsBuilder
                    .audioTracks(Collections.singletonList(localAudioTrack));
        }
        /*
         * Add local video track to connect options to share with participants.
         */
        if (localVideoTrack != null) {
            connectOptionsBuilder.videoTracks(Collections.singletonList(localVideoTrack));
        }
        //   if (localDataTrack != null) {
        //       connectOptionsBuilder.dataTracks(Collections.singletonList(localDataTrack));
        //   }

        room = Video.connect(this, connectOptionsBuilder.build(), roomListener());
        if(iscameraFlashAvailable()) {
            switchFlashFab.show();
        }

    }

    /*
     * The initial state when there is no active conversation.
     */
    private void initializeUI() {
        setDisconnectAction();

        if (config.getPrimaryColorHex() != null) {
            int primaryColor = Color.parseColor(config.getPrimaryColorHex());
            ColorStateList color = ColorStateList.valueOf(primaryColor);
            connectActionFab.setBackgroundTintList(color);
        }

        if (config.getSecondaryColorHex() != null) {
            int secondaryColor = Color.parseColor(config.getSecondaryColorHex());
            ColorStateList color = ColorStateList.valueOf(secondaryColor);
            switchCameraActionFab.setBackgroundTintList(color);
            localVideoActionFab.setBackgroundTintList(color);
            muteActionFab.setBackgroundTintList(color);
            switchAudioActionFab.setBackgroundTintList(color);
        }

        switchCameraActionFab.show();
        switchCameraActionFab.setOnClickListener(switchCameraClickListener());
        localVideoActionFab.show();
        localVideoActionFab.setOnClickListener(localVideoClickListener());
        muteActionFab.show();
        muteActionFab.setOnClickListener(muteClickListener());

        // commented to remove audio mode change logic.
        switchAudioActionFab.show();
        switchAudioActionFab.setOnClickListener(switchAudioClickListener());

        boolean hasFlash = getApplicationContext().getPackageManager()
                .hasSystemFeature(PackageManager.FEATURE_CAMERA_FLASH);

        if (hasFlash) {
            switchFlashFab.setOnClickListener(switchFlashClickListener());

        }
        //Added custom listener for switch window
        thumbnailVideoView.setOnClickListener(switchWindowClickListener());
        // windowImageview.setOnClickListener(switchWindowUsingImageClickListener());

        // commented to remove audio mode change logic.
        MenuActionFab.show();
        MenuActionFab.setOnClickListener(menuClickListener());

        CloseActionFab.setOnClickListener(closeClickListener());
        menu_list.setVisibility(View.GONE);

        Imageiconview.setOnClickListener(aboutClickListener());

    }

    /*
     * The actions performed during disconnect.
     */
    private void setDisconnectAction() {
        connectActionFab.setImageDrawable(ContextCompat.getDrawable(this, FAKE_R.getDrawable("ic_call_end_white_24px")));
        connectActionFab.show();
        connectActionFab.setOnClickListener(disconnectClickListener());
    }

    /*
     * Called when participant joins the room
     */
    private void addRemoteParticipant(RemoteParticipant participant) {

        /*
         * Add participant renderer
         */
        LOG.d(TAG, "args: " + config.getRoomownerid() + "fdfdf" + participant.getSid().equalsIgnoreCase(config.getRoomownerid()));
        if (participant.getSid().equalsIgnoreCase(config.getRoomownerid())) {

            participantIdentity = participant.getIdentity();

            if (participant.getRemoteVideoTracks().size() > 0) {
                RemoteVideoTrackPublication remoteVideoTrackPublication =
                        participant.getRemoteVideoTracks().get(0);

                if (remoteVideoTrackPublication.isTrackSubscribed()) {
                    addRemoteParticipantVideo(remoteVideoTrackPublication.getRemoteVideoTrack());
                } else {
                    // if(windowImageview.getVisibility() == View.GONE){
                    //     windowImageview.setVisibility(View.VISIBLE);
                    //     thumbnailVideoView.setVisibility(View.GONE);
                    // }
                }
            }
        }

        /*
         * Start listening for participant media events
         */
        participant.setListener(remoteParticipantListener());
    }

    /*
     * Set primary view as renderer for participant video track
     */
    private void addRemoteParticipantVideo(VideoTrack videoTrack) {


        // thumnailborderlayout.setVisibility(View.VISIBLE);

        LOG.d(TAG, "addRemoteParticipantVideo: " + videoTrack.isEnabled());
        if (videoTrack.isEnabled()) {
            thumbnailVideoView.setVisibility(View.VISIBLE);
            thumbnailVideoView.setMirror(false);
            videoTrack.removeRenderer(primaryVideoView);
            videoTrack.addRenderer(thumbnailVideoView);
            // windowImageview.setVisibility(View.GONE);
        } else {
            // if(windowImageview.getVisibility() == View.GONE){
            //     windowImageview.setVisibility(View.VISIBLE);
            //     thumbnailVideoView.setVisibility(View.GONE);
            // }
        }

    }

    private void moveLocalVideoToThumbnailView() {
        if (primaryVideoView.getVisibility() == View.GONE) {
            primaryVideoView.setVisibility(View.VISIBLE);
            if (localVideoTrack != null) {
                // thumnailborderlayout.setVisibility(View.GONE);
                localVideoTrack.removeRenderer(thumbnailVideoView);
                localVideoTrack.addRenderer(primaryVideoView);
            }
            if (localVideoView != null && primaryVideoView != null) {
                localVideoView = primaryVideoView;
            }
            primaryVideoView.setMirror(cameraCapturer.getCameraSource() ==
                    CameraSource.FRONT_CAMERA);
        }
    }

    /*
     * Called when participant leaves the room
     */
    private void removeRemoteParticipant(RemoteParticipant participant) {
        // if (!participant.getIdentity().equals(participantIdentity)) {
        //      return;
        //   }

        /*
         * Remove participant renderer
         */
        LOG.d(TAG, "args: " + config.getRoomownerid() + "fdfdf" + participant.getSid().equalsIgnoreCase(config.getRoomownerid()));
        if (participant.getSid().equalsIgnoreCase(config.getRoomownerid())) {
            if (participant.getRemoteVideoTracks().size() > 0) {
                RemoteVideoTrackPublication remoteVideoTrackPublication =
                        participant.getRemoteVideoTracks().get(0);

                /*
                 * Remove video only if subscribed to participant track
                 */
                if (remoteVideoTrackPublication.isTrackSubscribed()) {
                    removeParticipantVideo(remoteVideoTrackPublication.getRemoteVideoTrack());
                }
            }
        }

    }

    private void removeParticipantVideo(VideoTrack videoTrack) {

        //remove participant from view ,either in primary or thumnail window.
        if (isprimaryView) {
            videoTrack.removeRenderer(primaryVideoView);
            primaryVideoView.setVisibility(View.GONE);
        } else {
            // thumnailborderlayout.setVisibility(View.GONE);
            thumbnailVideoView.setVisibility(View.GONE);
            videoTrack.removeRenderer(thumbnailVideoView);
        }
        TwilioVideoActivity.this.handleConnectionError("The room has been closed by the organizer");
    }

    /*
     * Room events listener
     */
    private Room.Listener roomListener() {
        return new Room.Listener() {
            @Override
            public void onConnected(Room room) {
                localParticipant = room.getLocalParticipant();
                publishEvent(CallEvent.CONNECTED);

                final List<RemoteParticipant> remoteParticipants = room.getRemoteParticipants();

                if (remoteParticipants != null && !remoteParticipants.isEmpty()) {
                    //filter admin user participant
                    for (int i = 0; i < remoteParticipants.size(); i++) {

                        if (remoteParticipants.get(i).getSid().equalsIgnoreCase(config.getRoomownerid())) {
                            addRemoteParticipant(remoteParticipants.get(i));
                        }
                    }

                }

                // if(localParticipant !=null){

                //        if(localParticipant.publishTrack(localDataTrack)){
                //   Log.d(TwilioVideo.TAG, ":::::getLat()");


                //        }
                // }
            }

            @Override
            public void onConnectFailure(Room room, TwilioException e) {
                publishEvent(CallEvent.CONNECT_FAILURE, TwilioVideoUtils.convertToJSON(e));
                LOG.d("sddssd", "TOKEN: " + e.getLocalizedMessage());

                TwilioVideoActivity.this.handleConnectionError("Room connection lost");
            }

            @Override
            public void onReconnecting(@NonNull Room room, @NonNull TwilioException e) {
                publishEvent(CallEvent.RECONNECTING, TwilioVideoUtils.convertToJSON(e));
            }

            @Override
            public void onReconnected(@NonNull Room room) {
                publishEvent(CallEvent.RECONNECTED);
            }

            @Override
            public void onDisconnected(Room room, TwilioException e) {
                localParticipant = null;
                TwilioVideoActivity.this.room = null;
                // Only reinitialize the UI if disconnect was not called from onDestroy()
                if (!disconnectedFromOnDestroy && e != null) {
                    publishEvent(CallEvent.DISCONNECTED_WITH_ERROR, TwilioVideoUtils.convertToJSON(e));
                    TwilioVideoActivity.this.handleConnectionError("Room connection lost");
                } else {
                    publishEvent(CallEvent.DISCONNECTED);
                }
            }

            @Override
            public void onParticipantConnected(Room room, RemoteParticipant participant) {
                publishEvent(CallEvent.PARTICIPANT_CONNECTED);
                addRemoteParticipant(participant);
            }

            @Override
            public void onParticipantDisconnected(Room room, RemoteParticipant participant) {
                publishEvent(CallEvent.PARTICIPANT_DISCONNECTED);
                removeRemoteParticipant(participant);
            }

            @Override
            public void onRecordingStarted(Room room) {
                /*
                 * Indicates when media shared to a Room is being recorded. Note that
                 * recording is only available in our Group Rooms developer preview.
                 */
                Log.d(TwilioVideo.TAG, "onRecordingStarted");
            }

            @Override
            public void onRecordingStopped(Room room) {
                /*
                 * Indicates when media shared to a Room is no longer being recorded. Note that
                 * recording is only available in our Group Rooms developer preview.
                 */
                Log.d(TwilioVideo.TAG, "onRecordingStopped");
            }
        };
    }


    //Added localparticipant listener
    private LocalParticipant.Listener localParticipantListener() {
        return new LocalParticipant.Listener() {

            @Override
            public void onAudioTrackPublished(@android.support.annotation.NonNull LocalParticipant localParticipant, @android.support.annotation.NonNull LocalAudioTrackPublication localAudioTrackPublication) {

            }

            @Override
            public void onAudioTrackPublicationFailed(@android.support.annotation.NonNull LocalParticipant localParticipant, @android.support.annotation.NonNull LocalAudioTrack localAudioTrack, @android.support.annotation.NonNull TwilioException twilioException) {

            }

            @Override
            public void onVideoTrackPublished(@android.support.annotation.NonNull LocalParticipant localParticipant, @android.support.annotation.NonNull LocalVideoTrackPublication localVideoTrackPublication) {

            }

            @Override
            public void onVideoTrackPublicationFailed(@android.support.annotation.NonNull LocalParticipant localParticipant, @android.support.annotation.NonNull LocalVideoTrack localVideoTrack, @android.support.annotation.NonNull TwilioException twilioException) {

            }

            @Override
            public void onDataTrackPublished(@android.support.annotation.NonNull LocalParticipant localParticipant, @android.support.annotation.NonNull LocalDataTrackPublication localDataTrackPublication) {

                Log.d(TwilioVideo.TAG, ":::::getLat()");
                //   localDataTrack.send("xczcxxzz");
                //localDataTrackPublication.getLocalDataTrack().send(config.getLat());
            }

            @Override
            public void onDataTrackPublicationFailed(@android.support.annotation.NonNull LocalParticipant localParticipant, @android.support.annotation.NonNull LocalDataTrack localDataTrack, @android.support.annotation.NonNull TwilioException twilioException) {
                Log.d(TwilioVideo.TAG, ":::::getLat()");
            }

            @Override
            public void onNetworkQualityLevelChanged(@android.support.annotation.NonNull LocalParticipant localParticipant, @android.support.annotation.NonNull NetworkQualityLevel networkQualityLevel) {

            }
        };
    }

    private RemoteParticipant.Listener remoteParticipantListener() {
        return new RemoteParticipant.Listener() {

            @Override
            public void onAudioTrackPublished(RemoteParticipant remoteParticipant, RemoteAudioTrackPublication remoteAudioTrackPublication) {
                Log.i(TwilioVideo.TAG, String.format("onAudioTrackPublished: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteAudioTrackPublication: sid=%s, enabled=%b, " +
                                "subscribed=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteAudioTrackPublication.getTrackSid(),
                        remoteAudioTrackPublication.isTrackEnabled(),
                        remoteAudioTrackPublication.isTrackSubscribed(),
                        remoteAudioTrackPublication.getTrackName()));
            }

            @Override
            public void onAudioTrackUnpublished(RemoteParticipant remoteParticipant, RemoteAudioTrackPublication remoteAudioTrackPublication) {
                Log.i(TwilioVideo.TAG, String.format("onAudioTrackUnpublished: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteAudioTrackPublication: sid=%s, enabled=%b, " +
                                "subscribed=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteAudioTrackPublication.getTrackSid(),
                        remoteAudioTrackPublication.isTrackEnabled(),
                        remoteAudioTrackPublication.isTrackSubscribed(),
                        remoteAudioTrackPublication.getTrackName()));
            }

            @Override
            public void onAudioTrackSubscribed(RemoteParticipant remoteParticipant, RemoteAudioTrackPublication remoteAudioTrackPublication, RemoteAudioTrack remoteAudioTrack) {
                Log.i(TwilioVideo.TAG, String.format("onAudioTrackSubscribed: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteAudioTrack: enabled=%b, playbackEnabled=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteAudioTrack.isEnabled(),
                        remoteAudioTrack.isPlaybackEnabled(),
                        remoteAudioTrack.getName()));
                publishEvent(CallEvent.AUDIO_TRACK_ADDED);
            }

            @Override
            public void onAudioTrackSubscriptionFailed(RemoteParticipant remoteParticipant, RemoteAudioTrackPublication remoteAudioTrackPublication, TwilioException twilioException) {
                Log.i(TwilioVideo.TAG, String.format("onAudioTrackSubscriptionFailed: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteAudioTrackPublication: sid=%b, name=%s]" +
                                "[TwilioException: code=%d, message=%s]",
                        remoteParticipant.getIdentity(),
                        remoteAudioTrackPublication.getTrackSid(),
                        remoteAudioTrackPublication.getTrackName(),
                        twilioException.getCode(),
                        twilioException.getMessage()));
            }

            @Override
            public void onAudioTrackUnsubscribed(RemoteParticipant remoteParticipant, RemoteAudioTrackPublication remoteAudioTrackPublication, RemoteAudioTrack remoteAudioTrack) {
                Log.i(TwilioVideo.TAG, String.format("onAudioTrackUnsubscribed: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteAudioTrack: enabled=%b, playbackEnabled=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteAudioTrack.isEnabled(),
                        remoteAudioTrack.isPlaybackEnabled(),
                        remoteAudioTrack.getName()));
                publishEvent(CallEvent.AUDIO_TRACK_REMOVED);
            }

            @Override
            public void onVideoTrackPublished(RemoteParticipant remoteParticipant, RemoteVideoTrackPublication remoteVideoTrackPublication) {
                Log.i(TwilioVideo.TAG, String.format("onVideoTrackPublished: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteVideoTrackPublication: sid=%s, enabled=%b, " +
                                "subscribed=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteVideoTrackPublication.getTrackSid(),
                        remoteVideoTrackPublication.isTrackEnabled(),
                        remoteVideoTrackPublication.isTrackSubscribed(),
                        remoteVideoTrackPublication.getTrackName()));
            }

            @Override
            public void onVideoTrackUnpublished(RemoteParticipant remoteParticipant, RemoteVideoTrackPublication remoteVideoTrackPublication) {
                Log.i(TwilioVideo.TAG, String.format("onVideoTrackUnpublished: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteVideoTrackPublication: sid=%s, enabled=%b, " +
                                "subscribed=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteVideoTrackPublication.getTrackSid(),
                        remoteVideoTrackPublication.isTrackEnabled(),
                        remoteVideoTrackPublication.isTrackSubscribed(),
                        remoteVideoTrackPublication.getTrackName()));
            }

            @Override
            public void onVideoTrackSubscribed(RemoteParticipant remoteParticipant, RemoteVideoTrackPublication remoteVideoTrackPublication, RemoteVideoTrack remoteVideoTrack) {
                Log.i(TwilioVideo.TAG, String.format("onVideoTrackSubscribed: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteVideoTrack: enabled=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteVideoTrack.isEnabled(),
                        remoteVideoTrack.getName()));
                publishEvent(CallEvent.VIDEO_TRACK_ADDED);

                if (remoteParticipant.getSid().equalsIgnoreCase(config.getRoomownerid())) {

                    addRemoteParticipantVideo(remoteVideoTrack);
                }
            }

            @Override
            public void onVideoTrackSubscriptionFailed(RemoteParticipant remoteParticipant, RemoteVideoTrackPublication remoteVideoTrackPublication, TwilioException twilioException) {
                Log.i(TwilioVideo.TAG, String.format("onVideoTrackSubscriptionFailed: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteVideoTrackPublication: sid=%b, name=%s]" +
                                "[TwilioException: code=%d, message=%s]",
                        remoteParticipant.getIdentity(),
                        remoteVideoTrackPublication.getTrackSid(),
                        remoteVideoTrackPublication.getTrackName(),
                        twilioException.getCode(),
                        twilioException.getMessage()));
            }

            @Override
            public void onVideoTrackUnsubscribed(RemoteParticipant remoteParticipant, RemoteVideoTrackPublication remoteVideoTrackPublication, RemoteVideoTrack remoteVideoTrack) {
                Log.i(TwilioVideo.TAG, String.format("onVideoTrackUnsubscribed: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteVideoTrack: enabled=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteVideoTrack.isEnabled(),
                        remoteVideoTrack.getName()));
                publishEvent(CallEvent.VIDEO_TRACK_REMOVED);
                removeParticipantVideo(remoteVideoTrack);
            }

            @Override
            public void onDataTrackPublished(RemoteParticipant remoteParticipant, RemoteDataTrackPublication remoteDataTrackPublication) {
                Log.i(TwilioVideo.TAG, String.format("onDataTrackPublished: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteDataTrackPublication: sid=%s, enabled=%b, " +
                                "subscribed=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteDataTrackPublication.getTrackSid(),
                        remoteDataTrackPublication.isTrackEnabled(),
                        remoteDataTrackPublication.isTrackSubscribed(),
                        remoteDataTrackPublication.getTrackName()));
            }

            @Override
            public void onDataTrackUnpublished(RemoteParticipant remoteParticipant, RemoteDataTrackPublication remoteDataTrackPublication) {
                Log.i(TwilioVideo.TAG, String.format("onDataTrackUnpublished: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteDataTrackPublication: sid=%s, enabled=%b, " +
                                "subscribed=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteDataTrackPublication.getTrackSid(),
                        remoteDataTrackPublication.isTrackEnabled(),
                        remoteDataTrackPublication.isTrackSubscribed(),
                        remoteDataTrackPublication.getTrackName()));
            }

            @Override
            public void onDataTrackSubscribed(RemoteParticipant remoteParticipant, RemoteDataTrackPublication remoteDataTrackPublication, RemoteDataTrack remoteDataTrack) {
                Log.i(TwilioVideo.TAG, String.format("onDataTrackSubscribed: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteDataTrack: enabled=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteDataTrack.isEnabled(),
                        remoteDataTrack.getName()));
            }

            @Override
            public void onDataTrackSubscriptionFailed(RemoteParticipant remoteParticipant, RemoteDataTrackPublication remoteDataTrackPublication, TwilioException twilioException) {
                Log.i(TwilioVideo.TAG, String.format("onDataTrackSubscriptionFailed: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteDataTrackPublication: sid=%b, name=%s]" +
                                "[TwilioException: code=%d, message=%s]",
                        remoteParticipant.getIdentity(),
                        remoteDataTrackPublication.getTrackSid(),
                        remoteDataTrackPublication.getTrackName(),
                        twilioException.getCode(),
                        twilioException.getMessage()));
            }

            @Override
            public void onDataTrackUnsubscribed(RemoteParticipant remoteParticipant, RemoteDataTrackPublication remoteDataTrackPublication, RemoteDataTrack remoteDataTrack) {
                Log.i(TwilioVideo.TAG, String.format("onDataTrackUnsubscribed: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteDataTrack: enabled=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteDataTrack.isEnabled(),
                        remoteDataTrack.getName()));
            }

            @Override
            public void onAudioTrackEnabled(RemoteParticipant remoteParticipant, RemoteAudioTrackPublication remoteAudioTrackPublication) {

            }

            @Override
            public void onAudioTrackDisabled(RemoteParticipant remoteParticipant, RemoteAudioTrackPublication remoteAudioTrackPublication) {

            }

            @Override
            public void onVideoTrackEnabled(RemoteParticipant remoteParticipant, RemoteVideoTrackPublication remoteVideoTrackPublication) {

                Log.i(TwilioVideo.TAG, String.format("onVideoTrackEnabled: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteDataTrack: enabled=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteVideoTrackPublication.isTrackEnabled(),
                        remoteVideoTrackPublication.isTrackSubscribed()
                ));
                //isprimaryView - true. It should be primary window
                if (remoteParticipant.getSid().equalsIgnoreCase(config.getRoomownerid())) {

                    if (isprimaryView) {

                        if (remoteParticipant.getVideoTracks().get(0).getVideoTrack().isEnabled()) {

                            // primaryImageview.setVisibility(View.GONE);
                            remoteParticipant.getVideoTracks().get(0).getVideoTrack().removeRenderer(thumbnailVideoView);
                            remoteParticipant.getVideoTracks().get(0).getVideoTrack().removeRenderer(primaryVideoView);

                            if (primaryVideoView.getVisibility() == View.GONE) {
                                primaryVideoView.setVisibility(View.VISIBLE);
                                remoteParticipant.getVideoTracks().get(0).getVideoTrack().addRenderer(primaryVideoView);
                            } else {
                                remoteParticipant.getVideoTracks().get(0).getVideoTrack().addRenderer(primaryVideoView);
                            }
                        } else {
                            // primaryImageview.setVisibility(View.VISIBLE);
                        }
                    } else {
                        //windowImageview.setVisibility(View.GONE);

                        if (remoteParticipant.getVideoTracks().get(0).getVideoTrack().isEnabled()) {

                            remoteParticipant.getVideoTracks().get(0).getVideoTrack().removeRenderer(primaryVideoView);
                            remoteParticipant.getVideoTracks().get(0).getVideoTrack().removeRenderer(thumbnailVideoView);

                            // thumnailborderlayout.setVisibility(View.VISIBLE);
                            if (thumbnailVideoView.getVisibility() == View.GONE) {
                                thumbnailVideoView.setVisibility(View.VISIBLE);
                                remoteParticipant.getVideoTracks().get(0).getVideoTrack().addRenderer(thumbnailVideoView);
                            } else {
                                remoteParticipant.getVideoTracks().get(0).getVideoTrack().addRenderer(thumbnailVideoView);
                            }
                        }
                    }

                }
            }

            @Override
            public void onVideoTrackDisabled(RemoteParticipant remoteParticipant, RemoteVideoTrackPublication remoteVideoTrackPublication) {
                Log.i(TwilioVideo.TAG, String.format("onVideoTrackEnabled: " +
                                "[RemoteParticipant: identity=%s], " +
                                "[RemoteDataTrack: enabled=%b, name=%s]",
                        remoteParticipant.getIdentity(),
                        remoteVideoTrackPublication.isTrackEnabled(),
                        remoteVideoTrackPublication.isTrackSubscribed()
                ));

                //isprimaryView - true. It should be primary window
                if (remoteParticipant.getSid().equalsIgnoreCase(config.getRoomownerid())) {

                    if (isprimaryView) {

                        if (!remoteParticipant.getVideoTracks().get(0).getVideoTrack().isEnabled()) {
                            // primaryImageview.setVisibility(View.VISIBLE);
                            primaryVideoView.setVisibility(View.GONE);
                            remoteParticipant.getVideoTracks().get(0).getVideoTrack().removeRenderer(primaryVideoView);
                            remoteParticipant.getVideoTracks().get(0).getVideoTrack().removeRenderer(thumbnailVideoView);

                            isprimaryView = false;

                            if (primaryVideoView.getVisibility() == View.GONE) {

                                primaryVideoView.setVisibility(View.VISIBLE);
                                localVideoTrack.removeRenderer(thumbnailVideoView);
                                localVideoTrack.addRenderer(primaryVideoView);
                            } else {
                                localVideoTrack.removeRenderer(thumbnailVideoView);
                                localVideoTrack.addRenderer(primaryVideoView);
                            }
                            // thumnailborderlayout.setVisibility(View.GONE);
                            thumbnailVideoView.setVisibility(View.GONE);
                        } else {
                            //  primaryImageview.setVisibility(View.GONE);
                        }
                    } else {
                        // windowImageview.setVisibility(View.VISIBLE);

                        if (!remoteParticipant.getVideoTracks().get(0).getVideoTrack().isEnabled()) {

                            // thumnailborderlayout.setVisibility(View.GONE);
                            thumbnailVideoView.setVisibility(View.GONE);
                            remoteParticipant.getVideoTracks().get(0).getVideoTrack().removeRenderer(primaryVideoView);
                            remoteParticipant.getVideoTracks().get(0).getVideoTrack().removeRenderer(thumbnailVideoView);
                        }
                    }

                }

            }
        };
    }

    private View.OnClickListener disconnectClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (config.isHangUpInApp()) {
                    // Propagating the event to the web side in order to allow developers to do something else before disconnecting the room
                    publishEvent(CallEvent.HANG_UP);
                } else {
                    onDisconnect();
                }
            }
        };
    }

    // Added custom click listener for switch window
    private View.OnClickListener switchWindowClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Log.i(TwilioVideo.TAG, "isprimaryView::" + isprimaryView);
                flipwindowandprimary();
                new android.os.Handler().postDelayed(
                        new Runnable() {
                            public void run() {

                                boolean isvideoEnabled = false;
                                for (int i = 0; i < room.getRemoteParticipants().size(); i++) {

                                    if (room.getRemoteParticipants().get(i).getSid().equalsIgnoreCase(config.getRoomownerid())) {

                                        RemoteVideoTrackPublication remoteVideoTrackPublication = room.getRemoteParticipants().get(i).getRemoteVideoTracks().get(0);

                                        if (remoteVideoTrackPublication.getRemoteVideoTrack().isEnabled()) {

                                            isvideoEnabled = true;
                                            if (isprimaryView) {
                                                Log.i(TwilioVideo.TAG, "isprimaryView inside if::" + isprimaryView);

                                                remoteVideoTrackPublication.getRemoteVideoTrack().removeRenderer(primaryVideoView);
                                                //  thumnailborderlayout.setVisibility(View.VISIBLE);
                                                if (thumbnailVideoView.getVisibility() == View.GONE) {
                                                    thumbnailVideoView.setVisibility(View.VISIBLE);
                                                    remoteVideoTrackPublication.getRemoteVideoTrack().addRenderer(thumbnailVideoView);
                                                } else {
                                                    remoteVideoTrackPublication.getRemoteVideoTrack().addRenderer(thumbnailVideoView);
                                                }
                                            } else {
                                                Log.i(TwilioVideo.TAG, "isprimaryView: inside else:" + isprimaryView);

                                                // primaryImageview.setVisibility(View.GONE);
                                                //  thumnailborderlayout.setVisibility(View.GONE);
                                                remoteVideoTrackPublication.getRemoteVideoTrack().removeRenderer(thumbnailVideoView);

                                                if (primaryVideoView.getVisibility() == View.GONE) {
                                                    primaryVideoView.setVisibility(View.VISIBLE);
                                                    remoteVideoTrackPublication.getRemoteVideoTrack().addRenderer(primaryVideoView);
                                                } else {
                                                    remoteVideoTrackPublication.getRemoteVideoTrack().addRenderer(primaryVideoView);
                                                }
                                            }

                                        } else {
                                            // primaryImageview.setVisibility(View.VISIBLE);
                                        }
                                    }
                                }

                                if (isprimaryView) {

                                    Log.i(TwilioVideo.TAG, "isprimaryView iffffff::" + isprimaryView);

                                    isprimaryView = false;
                                    // thumnailborderlayout.setVisibility(View.GONE);
                                    //  primaryImageview.setVisibility(View.GONE);
                                    if (primaryVideoView.getVisibility() == View.GONE) {

                                        primaryVideoView.setVisibility(View.VISIBLE);
                                        localVideoTrack.removeRenderer(thumbnailVideoView);
                                        localVideoTrack.addRenderer(primaryVideoView);
                                    } else {
                                        localVideoTrack.removeRenderer(thumbnailVideoView);
                                        localVideoTrack.addRenderer(primaryVideoView);
                                    }
                                    if (!isvideoEnabled) {

                                        thumbnailVideoView.setVisibility(View.GONE);
                                        // windowImageview.setVisibility(View.VISIBLE);
                                    }

                                } else {
                                    isprimaryView = true;

                                    Log.i(TwilioVideo.TAG, "isprimaryView: eeeeeelle:" + isprimaryView);

                                    //thumnailborderlayout.setVisibility(View.VISIBLE);
                                    if (thumbnailVideoView.getVisibility() == View.GONE) {

                                        thumbnailVideoView.setVisibility(View.VISIBLE);
                                        localVideoTrack.removeRenderer(primaryVideoView);
                                        localVideoTrack.addRenderer(thumbnailVideoView);
                                    } else {
                                        localVideoTrack.removeRenderer(primaryVideoView);
                                        localVideoTrack.addRenderer(thumbnailVideoView);
                                    }
                                    if (!isvideoEnabled) {
                                        isprimaryView = false;
                                        thumbnailVideoView.setVisibility(View.GONE);
                                        //thumnailborderlayout.setVisibility(View.GONE);
                                        if (primaryVideoView.getVisibility() == View.GONE) {

                                            primaryVideoView.setVisibility(View.VISIBLE);
                                            localVideoTrack.removeRenderer(thumbnailVideoView);
                                            localVideoTrack.addRenderer(primaryVideoView);
                                        } else {
                                            localVideoTrack.removeRenderer(thumbnailVideoView);
                                            localVideoTrack.addRenderer(primaryVideoView);
                                        }
                                        // windowImageview.setVisibility(View.VISIBLE);
                                    }
                                }
                            }
                        },
                        600);


            }
        };
    }

    private View.OnClickListener switchWindowUsingImageClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Log.i(TwilioVideo.TAG, "isprimaryView" + isprimaryView);

                boolean isvideoEnabled = false;
                for (int i = 0; i < room.getRemoteParticipants().size(); i++) {

                    if (room.getRemoteParticipants().get(i).getSid().equalsIgnoreCase(config.getRoomownerid())) {

                        RemoteVideoTrackPublication remoteVideoTrackPublication = room.getRemoteParticipants().get(i).getRemoteVideoTracks().get(0);

                        if (remoteVideoTrackPublication.getRemoteVideoTrack().isEnabled()) {

                            isvideoEnabled = true;

                        }
                    }
                }

                if (isprimaryView) {
                    isprimaryView = false;


                } else {
                    isprimaryView = true;
                    // if remote video in window view

                    Log.i(TwilioVideo.TAG, "isvideoEnabled" + isvideoEnabled);
                    //remotevideo not enabled and move local video to window view
                    if (!isvideoEnabled && localVideoTrack != null) {

                        //  primaryImageview.setVisibility(View.VISIBLE);
                        // if(windowImageview.getVisibility() == View.VISIBLE) {
                        //     Log.i(TwilioVideo.TAG,"isvideoEnabled::: insdie");

                        //     windowImageview.setVisibility(View.GONE);
                        // }

                        localVideoTrack.removeRenderer(primaryVideoView);
                        primaryVideoView.setVisibility(View.GONE);
                        //thumnailborderlayout.setVisibility(View.VISIBLE);
                        if (thumbnailVideoView.getVisibility() == View.GONE) {
                            thumbnailVideoView.setVisibility(View.VISIBLE);

                            localVideoTrack.addRenderer(thumbnailVideoView);
                        } else {
                            localVideoTrack.addRenderer(thumbnailVideoView);
                        }


                    }

                }

            }
        };
    }
    //end


    public void animateLayout() {


        // Refer the ImageView like this


        final FrameLayout layout = (FrameLayout) findViewById(R.id.video_container);

        //   TranslateAnimation animate;
        //  if (imageView.getHeight() == 0) {
        //      imageView.getHeight(); // parent layout
        //      animate = new TranslateAnimation(imageView.getWidth()/2, 0, 0, 0);
        //  } else {
        //      animate = new TranslateAnimation(imageView.getWidth(),0, 0, 0); // View for animation
        // }

        //animate.setDuration(1000);
        //  animate.setFillAfter(true);
        //imageView.startAnimation(animate);

        //  final FrameLayout layout = (FrameLayout) findViewById(R.id.video_container);

        // layout.animate().translationYBy(1000f).setDuration(500);


        // Animation animRotateAclk = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.flip_in_left);
        // imageView.startAnimation(animRotateAclk);
        // Animation animRotateAclk1 = AnimationUtils.loadAnimation(getApplicationContext(),R.anim.flip_in_right);
        // imageView.startAnimation(animRotateAclk1);
        // ObjectAnimator flip = ObjectAnimator.ofFloat(imageView, "translationX", 0f, imageView.getWidth());
        // flip.setDuration(2000);
        // flip.start();
        if (!isprimaryView) {


            VideoView imageView = (VideoView) findViewById(R.id.primary_video_view);
            // VideoView windowview = (VideoView) findViewById(R.id.thumbnail_video_view);

            //  if (isprimaryView && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            //       windowview.setForeground(null);
            //   }
            TranslateAnimation animate = new TranslateAnimation(
                    0,
                    imageView.getWidth(),
                    0,
                    0);
            animate.setDuration(1500);
            animate.setFillAfter(true);
            imageView.startAnimation(animate);
            animate.setAnimationListener(new Animation.AnimationListener() {
                @Override
                public void onAnimationStart(Animation arg0) {
                }

                @Override
                public void onAnimationRepeat(Animation arg0) {
                }

                @Override
                public void onAnimationEnd(Animation arg0) {

                    TranslateAnimation animate1 = new TranslateAnimation(
                            imageView.getWidth(),
                            0,
                            0,
                            0);
                    animate1.setDuration(1500);
                    animate1.setFillAfter(true);
                    imageView.startAnimation(animate1);
                    animate1.setAnimationListener(new Animation.AnimationListener() {
                        @Override
                        public void onAnimationStart(Animation arg0) {
                        }

                        @Override
                        public void onAnimationRepeat(Animation arg0) {
                        }

                        @Override
                        public void onAnimationEnd(Animation arg0) {
                            boolean tempiscameraflashavailable = iscameraFlashAvailable();
                            isflashon = false;
                            int icon;
                            icon = FAKE_R.getDrawable("flashoff");
                            switchFlashFab.setImageDrawable(ContextCompat.getDrawable(TwilioVideoActivity.this, icon));

                            if (tempiscameraflashavailable) {
                                switchFlashFab.setVisibility(View.VISIBLE);
                            }else{
                                switchFlashFab.setVisibility(View.GONE);
                            }
                         }
                    });

                }
            });
        }else{
            new android.os.Handler().postDelayed(
                    new Runnable() {
                        public void run() {
                            boolean tempiscameraflashavailable = iscameraFlashAvailable();
                            isflashon = false;
                            int icon;
                            icon = FAKE_R.getDrawable("flashoff");
                            switchFlashFab.setImageDrawable(ContextCompat.getDrawable(TwilioVideoActivity.this, icon));

                            if ((cameraCapturer.getCameraSource() == CameraSource.FRONT_CAMERA)) {
                                switchFlashFab.setVisibility(View.VISIBLE);
                            }else{
                                switchFlashFab.setVisibility(View.GONE);
                            }
                        }
           },100);
        }
    }

    boolean dirX = true;

    private View.OnClickListener menuClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MenuActionFab.hide();
                menu_list.setVisibility(View.VISIBLE);
            }
        };
    }
    private View.OnClickListener aboutClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                aboutalert();
            }
        };
    }
    private View.OnClickListener closeClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                menu_list.setVisibility(View.GONE);
                MenuActionFab.show();
            }
        };
    }

    public void aboutalert() {

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("ExAM RV");
        builder.setMessage(config.getappversion())
                .setCancelable(false)
                .setNegativeButton("OK", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                    }
                });
        AlertDialog alert = builder.create();
        alert.show();
    }
    public void flipwindowandprimary() {

        //  FrameLayout imageView = (FrameLayout) findViewById(R.id.video_container);


       /* if(dirX){
            dirX = false;
            ObjectAnimator flip = ObjectAnimator.ofFloat(imageView, "rotationX", 0f, 360f);
            flip.setDuration(2000);
            flip.start();
        }else{
            dirX = true;
            ObjectAnimator flip = ObjectAnimator.ofFloat(imageView, "rotationX", 360f, 0f);
            flip.setDuration(1000);
            flip.start();
        }*/

        //  ObjectAnimator animation = ObjectAnimator.ofFloat(imageView, "rotationY", 0.0f, 360f);
        //  animation.setDuration(3000);
        //  animation.setInterpolator(new AccelerateDecelerateInterpolator());
        // animation.start();


        TranslateAnimation primaryanimate = new TranslateAnimation(
                0,
                0,
                0,
                primaryVideoView.getHeight()
        );
        primaryanimate.setDuration(500);
        primaryanimate.setFillAfter(true);
        primaryVideoView.startAnimation(primaryanimate);
        primaryanimate.setAnimationListener(new Animation.AnimationListener() {
            @Override
            public void onAnimationStart(Animation arg0) {
            }

            @Override
            public void onAnimationRepeat(Animation arg0) {
            }

            @Override
            public void onAnimationEnd(Animation arg0) {

                TranslateAnimation animate = new TranslateAnimation(
                        0,
                        0,
                        primaryVideoView.getHeight(),
                        0);
                animate.setDuration(500);
                animate.setFillAfter(true);
                primaryVideoView.startAnimation(animate);
            }
        });

      /*  if(thumbnailVideoView.getVisibility() ==View.VISIBLE) {


            TranslateAnimation windowanimate = new TranslateAnimation(
                    0,
                    0,
                    0,
                    thumbnailVideoView.getHeight()
                    );
            windowanimate.setDuration(500);
            windowanimate.setFillAfter(true);
            thumbnailVideoView.startAnimation(windowanimate);
            windowanimate.setAnimationListener(new Animation.AnimationListener() {
                @Override
                public void onAnimationStart(Animation arg0) {
                }

                @Override
                public void onAnimationRepeat(Animation arg0) {
                }

                @Override
                public void onAnimationEnd(Animation arg0) {

                    TranslateAnimation animate = new TranslateAnimation(
                            0,
                            0,
                            thumbnailVideoView.getHeight(),
                            0);
                    animate.setDuration(500);
                    animate.setFillAfter(true);
                    thumbnailVideoView.startAnimation(animate);
                }
            });
        }*/
    }

    private View.OnClickListener switchCameraClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (cameraCapturer != null) {
                    animateLayout();
                    CameraSource cameraSource = cameraCapturer.getCameraSource();
                    cameraCapturer.switchCamera();
                    if (primaryVideoView.getVisibility() == View.VISIBLE) {
                        primaryVideoView.setMirror(cameraSource == CameraSource.BACK_CAMERA);
                    } else {
                        // primaryVideoView.setMirror(cameraSource == CameraSource.BACK_CAMERA);
                    }

                }
            }
        };
    }

    private View.OnClickListener switchAudioClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (audioManager.isSpeakerphoneOn()) {
                    audioManager.setSpeakerphoneOn(false);
                } else {
                    audioManager.setSpeakerphoneOn(true);

                }
                int icon = audioManager.isSpeakerphoneOn() ?
                        FAKE_R.getDrawable("loudspeaker") : FAKE_R.getDrawable("ic_volume_headhphones_white_24dp");
                switchAudioActionFab.setImageDrawable(ContextCompat.getDrawable(
                        TwilioVideoActivity.this, icon));
            }
        };
    }

    // Zoom functionality
    public float finger_spacing = 0;
    public double zoom_level = 1;
    public float mDist =0.0f;

    public boolean onTouchEvent(MotionEvent event) {

        if (localVideoTrack != null) {
            boolean enable = localVideoTrack.isEnabled();
            if (enable && !isprimaryView && iscameraFlashAvailable()) {
                mScaleGestureDetector.onTouchEvent(event);
                try {
                    CameraManager manager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
                    CameraSource cameraSource = cameraCapturer.getCameraSource();
                    CameraCharacteristics characteristics = manager.getCameraCharacteristics(cameraCapturer.getCameraId(cameraSource));
                    float maxzoom = (characteristics.get(CameraCharacteristics.SCALER_AVAILABLE_MAX_DIGITAL_ZOOM)) * 10;

                    Rect m = characteristics.get(CameraCharacteristics.SENSOR_INFO_ACTIVE_ARRAY_SIZE);
                    int action = event.getAction();
                    float current_finger_spacing;

                    if (event.getPointerCount() > 1) {
                        // Multi touch logic
                        current_finger_spacing = getFingerSpacing(event);
                        if (finger_spacing != 0) {
                            if (current_finger_spacing > finger_spacing && maxzoom > zoom_level) {
                                zoom_level = zoom_level + .4;
                                //zoom_level++;
                            } else if (current_finger_spacing < finger_spacing && zoom_level > 1) {
                                zoom_level = zoom_level - .4;
                                //zoom_level--;
                            }
                            int minW = (int) (m.width() / maxzoom);
                            int minH = (int) (m.height() / maxzoom);
                            int difW = m.width() - minW;
                            int difH = m.height() - minH;
                            int cropW = difW / 100 * (int) zoom_level;
                            int cropH = difH / 100 * (int) zoom_level;
                            cropW -= cropW & 3;
                            cropH -= cropH & 3;
                            Rect zoom = new Rect(cropW, cropH, m.width() - cropW, m.height() - cropH);

                            if (cameraCapturer.usingCamera1()) {

                                if (action == MotionEvent.ACTION_POINTER_DOWN) {
                                    Log.i(TwilioVideo.TAG, "zoom exception if");

                                    mDist = getFingerSpacing(event);
                                    Log.i(TwilioVideo.TAG, "zoom exception if mDist"+mDist);

                                } else if (action == MotionEvent.ACTION_MOVE ) {
                                    //  mCamera.cancelAutoFocus();
                                    handlezoom(event);

                                }
                            } else {
                                cameraCapturer.setZoomfornew(zoom, isflashon);
                            }
                        }
                        finger_spacing = current_finger_spacing;
                    } else {
                        if (action == MotionEvent.ACTION_POINTER_DOWN) {
                            //single touch logic
                        }
                    }

                } catch (CameraAccessException e) {
                    throw new RuntimeException("can not access camera.", e);
                }
            }
        }
        return true;
    }

    public  float newDist=0;
    public void handlezoom(MotionEvent event){
        mDist=newDist;
        newDist = getFingerSpacing(event);
        cameraCapturer.setZoomforOld(mDist ,newDist, isflashon);

    }
    //Determine the space between the first two fingers
    @SuppressWarnings("deprecation")
    private float getFingerSpacing(MotionEvent event) {
        float x = event.getX(0) - event.getX(1);
        float y = event.getY(0) - event.getY(1);
        return (float) Math.sqrt(x * x + y * y);
    }

    private class ScaleListener extends ScaleGestureDetector.SimpleOnScaleGestureListener {
        @Override
        public boolean onScale(ScaleGestureDetector scaleGestureDetector) {
            mScaleFactor *= scaleGestureDetector.getScaleFactor();
            mScaleFactor = Math.max(0.1f,
                    Math.min(mScaleFactor, 10.0f));
            return true;
        }

    }

    // public boolean onTouchEvent(MotionEvent motionEvent) {
    //    mScaleGestureDetector.onTouchEvent(motionEvent);
    //    return true;
    // }

    /**
     * Turn the flashlight on.
     */
    public void turnOnFlash() {
        cameraCapturer.TurnONFlash();
        int icon;
        if (isflashon) {
            icon = FAKE_R.getDrawable("flashon");
        } else {
            icon = FAKE_R.getDrawable("flashoff");
        }
        switchFlashFab.setImageDrawable(ContextCompat.getDrawable(TwilioVideoActivity.this, icon));
    }

    /**
     * Turn the flashlight off.
     */
    public void turnOffFlash() {
        cameraCapturer.TurnOffFlash();
        int icon;
        if (isflashon) {
            icon = FAKE_R.getDrawable("flashon");
        } else {
            icon = FAKE_R.getDrawable("flashoff");
        }
        switchFlashFab.setImageDrawable(ContextCompat.getDrawable(TwilioVideoActivity.this, icon));
    }
    private View.OnClickListener switchFlashClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isflashon = ! isflashon;
               if(isflashon){
                  // turnFlashlightOn();
                   turnOnFlash();
               }else {
                   //turnFlashlightOff();
                   turnOffFlash();
               }
            }
        };
    }
    private View.OnClickListener localVideoClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*
                 * Enable/disable the local video track
                 */
                if (localVideoTrack != null) {
                    boolean enable = !localVideoTrack.isEnabled();
                    localVideoTrack.enable(enable);
                    int icon;
                    if (enable) {
                        icon = FAKE_R.getDrawable("ic_videocam_green_24px");
                        switchCameraActionFab.show();

                    } else {
                        icon = FAKE_R.getDrawable("ic_videocam_off_red_24px");
                        switchCameraActionFab.hide();
                    }

                    localVideoActionFab.setImageDrawable(
                            ContextCompat.getDrawable(TwilioVideoActivity.this, icon));
                }
            }
        };
    }

    private View.OnClickListener muteClickListener() {
        return new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*
                 * Enable/disable the local audio track. The results of this operation are
                 * signaled to other Participants in the same Room. When an audio track is
                 * disabled, the audio is muted.
                 */
                if (localAudioTrack != null) {
                    boolean enable = !localAudioTrack.isEnabled();
                    localAudioTrack.enable(enable);
                    int icon = enable ?
                            FAKE_R.getDrawable("ic_mic_green_24px") : FAKE_R.getDrawable("ic_mic_off_red_24px");
                    muteActionFab.setImageDrawable(ContextCompat.getDrawable(
                            TwilioVideoActivity.this, icon));
                }
            }
        };
    }

    private void configureAudio(boolean enable) {
        if (enable) {
            previousAudioMode = audioManager.getMode();
            // Request audio focus before making any device switch
            requestAudioFocus();
            /*
             * Use MODE_IN_COMMUNICATION as the default audio mode. It is required
             * to be in this mode when playout and/or recording starts for the best
             * possible VoIP performance. Some devices have difficulties with
             * speaker mode if this is not set.
             */
            audioManager.setMode(AudioManager.MODE_IN_COMMUNICATION);
            /*
             * Always disable microphone mute during a WebRTC call.
             */
            previousMicrophoneMute = audioManager.isMicrophoneMute();
            audioManager.setMicrophoneMute(false);
        } else {
            audioManager.setMode(previousAudioMode);
            audioManager.abandonAudioFocus(null);
            audioManager.setMicrophoneMute(previousMicrophoneMute);
        }
    }

    private void requestAudioFocus() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            AudioAttributes playbackAttributes = new AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_VOICE_COMMUNICATION)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                    .build();
            AudioFocusRequest focusRequest =
                    new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
                            .setAudioAttributes(playbackAttributes)
                            .setAcceptsDelayedFocusGain(true)
                            .setOnAudioFocusChangeListener(
                                    new AudioManager.OnAudioFocusChangeListener() {
                                        @Override
                                        public void onAudioFocusChange(int i) {
                                        }
                                    })
                            .build();
            audioManager.requestAudioFocus(focusRequest);
        } else {
            audioManager.requestAudioFocus(null, AudioManager.STREAM_VOICE_CALL,
                    AudioManager.AUDIOFOCUS_GAIN_TRANSIENT);
        }
    }

    private void handleConnectionError(String message) {
        if (config.isHandleErrorInApp()) {
            Log.i(TwilioVideo.TAG, "Error handling disabled for the plugin. This error should be handled in the hybrid app");
            this.finish();
            return;
        }
        Log.i(TwilioVideo.TAG, "Connection error handled by the plugin");
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setMessage(message)
                .setCancelable(false)
                .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        TwilioVideoActivity.this.finish();
                    }
                });
        AlertDialog alert = builder.create();
        alert.show();
    }


    @Override
    public void onDisconnect() {
        /*
         * Disconnect from room
         */
        // Added for show alert on disconnect
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Leave Room");
        builder.setMessage("Are you sure?")
                .setCancelable(false)
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                    }
                })
                .setPositiveButton("Leave", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        if (room != null) {
                            room.disconnect();
                        }
                        TwilioVideoActivity.this.finish();
                    }
                });
        AlertDialog alert = builder.create();
        alert.show();
    }

    @Override
    public void finish() {
        configureAudio(false);
        super.finish();
        overridePendingTransition(0, 0);
    }

    private void publishEvent(CallEvent event) {
        TwilioVideoManager.getInstance().publishEvent(event);
    }

    private void publishEvent(CallEvent event, JSONObject data) {
        TwilioVideoManager.getInstance().publishEvent(event, data);
    }

}

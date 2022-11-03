package org.apache.cordova.twiliovideo;

public enum CallEvent {
    OPENED,
    CONNECTED,
    CONNECT_FAILURE,
    DISCONNECTED,
    DISCONNECTED_WITH_ERROR,
    RECONNECTING,
    RECONNECTED,
    PARTICIPANT_CONNECTED,
    PARTICIPANT_DISCONNECTED,
    AUDIO_TRACK_ADDED,
    AUDIO_TRACK_REMOVED,
    VIDEO_TRACK_ADDED,
    VIDEO_TRACK_REMOVED,
    HANG_UP,
    CLOSED,
    PERMISSIONS_REQUIRED
}
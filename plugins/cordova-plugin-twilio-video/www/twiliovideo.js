var exec = require('cordova/exec');

var TwilioVideo = function() {};

TwilioVideo.openRoom = function(token, room, eventCallback, config) {
    console.log('token, room, eventCallback, config::',token, room, eventCallback, config);
    config = config != null ? config : null; 
    config = {};
    config.i18nConnectionError = 'Message shown when it is not possible to join the room';
    config.i18nDisconnectedWithError = 'Message show when the client is disconnected due to an error';
    config.i18nAccept= 'Accept translation';
    config.handleErrorInApp  = false; // Flag to indicate the application will manage any error in the app by events emitted by the plugin
    config.hangUpInApp = false; //Flag to indicate the application should hang up the call by calling 'closeRoom'
        
    exec(function(e) {
        console.log("Twilio video event fired: " + e);
        if (eventCallback) {
            eventCallback(e.event, e.data);
        }
    }, null, 'TwilioVideoPlugin', 'openRoom', [token, room, config]);
};


TwilioVideo.closeRoom = function() {
    return new Promise(function(resolve, reject) {
        exec(function() {
            resolve();
        }, function(error) {
            reject(error);
        }, "TwilioVideoPlugin", "closeRoom", []);
    });
};

TwilioVideo.hasRequiredPermissions = function() {
    return new Promise(function(resolve, reject) {
        exec(function(result) {
            resolve(result);
        }, function(error) {
            reject(error);
        }, "TwilioVideoPlugin", "hasRequiredPermissions", []);
    });
};

TwilioVideo.requestPermissions = function() {
    return new Promise(function(resolve, reject) {
        exec(function(result) {
            resolve(result);
        }, function(error) {
            reject(error);
        }, "TwilioVideoPlugin", "requestPermissions", []);
    });
};

module.exports = TwilioVideo;

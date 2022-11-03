cordova.define("cordova-plugin-twilio-video-v2preview.twilio-solution", function(require, exports, module) {
var conversations = {
  open: function(callTo,token,remoteParticipantName,succ,fail) {
    cordova.exec(
      succ || function(){},
      fail || function(){},
      'VideoConversationPlugin',
      'open',
      [callTo,token,remoteParticipantName]
    );
  }
};

module.exports = conversations;
});

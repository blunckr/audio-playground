var Dispatcher = require('../Dispatcher');
var SampleConstants = require('../constants/SampleConstants');

module.exports = {
  create: function() {
    Dispatcher.dispatch({
      actionType: SampleConstants.CREATE,
    });
  },

  addAudioNode: function(id, audioNode) {
    Dispatcher.dispatch({
      actionType: SampleConstants.ADD_AUDIO_NODE,
      id, audioNode
    });
  },

  stopRecording: function () {
    Dispatcher.dispatch({
      actionType: SampleConstants.STOP_RECORDING
    });
  },

  toggleLooping: function (id) {
    Dispatcher.dispatch({
      actionType: SampleConstants.TOGGLE_LOOPING,
      id
    });
  },

  destroy: function(id) {
    Dispatcher.dispatch({
      actionType: SampleConstants.DESTROY,
      id
    });
  }


};

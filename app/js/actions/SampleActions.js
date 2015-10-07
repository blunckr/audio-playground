var Dispatcher = require('../Dispatcher');
var SampleConstants = require('../constants/SampleConstants');

module.exports = {
  create: function() {
    Dispatcher.dispatch({
      actionType: SampleConstants.SAMPLE_CREATE,
    });
  },

  stopRecording: function () {
    Dispatcher.dispatch({
      actionType: SampleConstants.SAMPLE_STOP_RECORDING
    });
  },

  play: function (id) {
    Dispatcher.dispatch({
      actionType: SampleConstants.SAMPLE_PLAY,
      id: id
    });
  },

  destroy: function(id) {
    Dispatcher.dispatch({
      actionType: SampleConstants.SAMPLE_DESTROY,
      id: id
    });
  }
};

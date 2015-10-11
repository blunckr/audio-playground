var Dispatcher = require('../Dispatcher');
var SampleConstants = require('../constants/SampleConstants');

module.exports = {
  create: function() {
    Dispatcher.dispatch({
      actionType: SampleConstants.CREATE,
    });
  },

  stopRecording: function () {
    Dispatcher.dispatch({
      actionType: SampleConstants.STOP_RECORDING
    });
  },

  play: function (id) {
    Dispatcher.dispatch({
      actionType: SampleConstants.PLAY,
      id: id
    });
  },

  destroy: function(id) {
    Dispatcher.dispatch({
      actionType: SampleConstants.DESTROY,
      id: id
    });
  }
};

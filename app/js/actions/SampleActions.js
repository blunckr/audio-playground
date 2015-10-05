var Dispatcher = require('../Dispatcher');
var SampleConstants = require('../constants/SampleConstants');

module.exports = {
  create: function(text) {
    Dispatcher.dispatch({
      actionType: SampleConstants.SAMPLE_CREATE,
      text: text
    });
  },

  destroy: function(id) {
    Dispatcher.dispatch({
      actionType: SampleConstants.SAMPLE_DESTROY,
      id: id
    });
  }
};

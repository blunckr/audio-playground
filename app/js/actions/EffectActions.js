var Dispatcher = require('../Dispatcher');
var EffectConstants = require('../constants/EffectConstants');

module.exports = {
  create: function(sampleID, type) {
    Dispatcher.dispatch({
      actionType: EffectConstants.CREATE,
      sampleID,
      type
    });
  }
};

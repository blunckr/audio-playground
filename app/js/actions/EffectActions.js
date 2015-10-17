var Dispatcher = require('../Dispatcher');
var EffectConstants = require('../constants/EffectConstants');

module.exports = {
  create: function(sampleID, type) {
    Dispatcher.dispatch({
      actionType: EffectConstants.CREATE,
      sampleID,
      type
    });
  },

  updateParam: function(effectID, paramID, newValue) {
    Dispatcher.dispatch({
      actionType: EffectConstants.UPDATE_PARAM,
      effectID,
      paramID,
      newValue
    });
  }
};

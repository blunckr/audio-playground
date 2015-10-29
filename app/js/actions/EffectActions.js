import Dispatcher from '../Dispatcher';
import EffectConstants from '../constants/EffectConstants';

module.exports = {
  create(sampleID, type) {
    Dispatcher.dispatch({
      actionType: EffectConstants.CREATE,
      sampleID,
      type
    });
  },

  updateParam(effectID, paramID, newValue) {
    Dispatcher.dispatch({
      actionType: EffectConstants.UPDATE_PARAM,
      effectID,
      paramID,
      newValue
    });
  },
  destroy(effectID) {
    Dispatcher.dispatch({
      actionType: EffectConstants.DESTROY,
      effectID
    });
  }
};

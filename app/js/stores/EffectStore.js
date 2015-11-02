import BaseStore from './BaseStore';
import SampleStore from './SampleStore';
import Dispatcher from '../lib/Dispatcher';
import EffectConstants from '../constants/EffectConstants';
import Effects from '../lib/Effects';

import assign from 'lodash/object/assign';
import forOwn from 'lodash/object/forOwn';
import sortBy from 'lodash/collection/sortBy';

var _effects = {};
var _effectID = 0;


function create(sampleID, type) {
  var [node, params] = Effects.create(type);
  var id = _effectID++;
  var index = EffectStore.getSampleEffects(sampleID).length;
  _effects[id] = {id, node, sampleID, index, type, params};
  SampleStore.rewireEffects(sampleID);
}

function updateParam (effectID, paramID, newValue) {
  var effect = _effects[effectID];
  effect.params[paramID] = newValue;
  Effects.update(effect.type, effect.node, effect.params);
}

function destroy(effectID) {
  var effect = _effects[effectID];
  delete _effects[effectID];
  SampleStore.rewireEffects(effect.sampleID);
}

var EffectStore = assign({}, BaseStore, {
  getSampleEffects(sampleID) {
    var sampleEffects = [];
    forOwn(_effects, (effect) => {
      if (effect.sampleID == sampleID){
        sampleEffects.push(effect);
      }
    });
    return sortBy(sampleEffects, (effect) => { return effect.index; });
  },

  getEffectTypes() {
    return Effects.list();
  },

  dispatcherIndex: Dispatcher.register((action) => {
    switch (action.actionType) {
    case EffectConstants.CREATE:
      create(action.sampleID, action.type);
      EffectStore.emitChange();
      break;
    case EffectConstants.UPDATE_PARAM:
      updateParam(action.effectID, action.paramID, action.newValue);
      EffectStore.emitChange();
      break;
    case EffectConstants.DESTROY:
      destroy(action.effectID);
      EffectStore.emitChange();
      break;
    }
  })
});

export default EffectStore;

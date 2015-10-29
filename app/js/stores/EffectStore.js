import BaseStore from './BaseStore';
import SampleStore from './SampleStore';
import Dispatcher from '../Dispatcher';
import EffectConstants from '../constants/EffectConstants';
import {AudioContext} from '../lib/AudioApiProxy';

import assign from 'lodash/object/assign';
import forOwn from 'lodash/object/forOwn';
import sortBy from 'lodash/collection/sortBy';

var _effects = {};
var _effectID = 0;

// this is just to help keep the same structure
function newParam (name, value) {
  return {name, value};
}

function create(sampleID, type) {
  var node;
  var params = {};
  switch (type) {
  case EffectConstants.TYPES.STEREO_PANNER:
    node = AudioContext.createStereoPanner();
    node.pan.value = 0.0;
    params[EffectConstants.PARAMS.STEREO_PANNER_VALUE] = newParam('Direction', 0.0);
    break;
  case EffectConstants.TYPES.GAIN_NODE:
    node = AudioContext.createGain();
    node.gain.value = 1.0;
    params[EffectConstants.PARAMS.GAIN_NODE_VALUE] = newParam('Gain Value', 1.0);
    break;
  }
  var id = _effectID++;
  var index = EffectStore.getSampleEffects(sampleID).length;
  _effects[id] = {id, node, sampleID, index, type, params};
  SampleStore.rewireEffects(sampleID);
}

function updateParam (effectID, paramID, newValue) {
  var effect = _effects[effectID];
  switch(paramID) {
  case EffectConstants.PARAMS.GAIN_NODE_VALUE:
    effect.node.gain.value = newValue;
    break;
  case EffectConstants.PARAMS.STEREO_PANNER_VALUE:
    effect.node.pan.value = newValue;
    break;
  }

  effect.params[paramID].value = newValue;
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

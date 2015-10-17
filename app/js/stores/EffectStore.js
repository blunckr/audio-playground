var BaseStore = require('./BaseStore');
var SampleStore = require('./SampleStore');
var Dispatcher = require('../Dispatcher');
var EffectConstants = require('../constants/EffectConstants');
var EffectActions = require('../actions/EffectActions');
var audio = require('../lib/AudioContext');

var assign = require('lodash/object/assign');
var forOwn = require('lodash/object/forOwn');
var sortBy = require('lodash/collection/sortBy');

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
    case EffectConstants.TYPES.CONVOVLER_NODE:
      node = audio.createConvolver();
      break;
    case EffectConstants.TYPES.GAIN_NODE:
      node = audio.createGain();
      node.gain.value = 1.0;
      params[EffectConstants.PARAMS.GAIN_NODE_VALUE] = newParam('Gain Value', 0.0);
      break;
  }
  var id = _effectID++;
  var index = EffectStore.getSampleEffects(sampleID).length;
  _effects[id] = {id, node, sampleID, index, type, params};
  SampleStore.rewireEffects(sampleID, EffectStore.getSampleEffects(sampleID));
}

function updateParam (effectID, paramID, newValue) {
  var effect = _effects[effectID];
  switch(paramID) {
    case EffectConstants.PARAMS.GAIN_NODE_VALUE:
      effect.node.gain.value = newValue;
      break;
  }

  effect.params[paramID].value = newValue;
}

var EffectStore = assign({}, BaseStore, {
  getSampleEffects: function (sampleID) {
    var sampleEffects = [];
    forOwn(_effects, (effect, id) => {
      if (effect.sampleID == sampleID){
        sampleEffects.push(effect);
      }
    });
    return sortBy(sampleEffects, (effect) => {effect.index});
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
    }
  }),
});

export default EffectStore;

var BaseStore = require('./BaseStore');
var Dispatcher = require('../Dispatcher');
var EffectConstants = require('../constants/EffectConstants');
var EffectActions = require('../actions/EffectActions');
var audio = require('../lib/AudioContext');

var assign = require('lodash/object/assign');
var forOwn = require('lodash/object/forOwn');
var sortBy = require('lodash/collection/sortBy');

var _effects = {};
var _effectID = 0;

function create(sampleID, effectType) {
  var node;
  switch (effectType) {
    case EffectConstants.TYPES.CONVOVLER_NODE:
      node = audio.createConvolver();
      break;
    case EffectConstants.TYPES.GAIN_NODE:
      node = audio.createGain();
      break;
  }
  debugger
  var id = _effectID++;
  var index = EffectStore.getSampleEffects(sampleID).length;
  _effects[id] = {id, node, sampleID, index, type: effectType};
}

var EffectStore = assign({}, BaseStore, {
  getSampleEffects: function (sampleID) {
    var sampleEffects = [];
    forOwn(_effects, (effect, id) => {
      if (id == sampleID){
        sampleEffects.push(effect);
      }
    });
    return sortBy(sampleEffects, (effect) => {effect.index});
  },

  dispatcherIndex: Dispatcher.register((action) => {
    switch (action.actionType) {
      case EffectConstants.CREATE:
        create(action.sampleID, action.effectType);
        EffectStore.emitChange();
        break;
    }
  }),
});

export default EffectStore;

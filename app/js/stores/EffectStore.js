var BaseStore = require('./BaseStore');
var Dispatcher = require('../Dispatcher');
var EffectConstants = require('../constants/EffectConstants');
var EffectActions = require('../actions/EffectActions');
var audio = require('../lib/AudioContext');

var assign = require('lodash/object/assign');
var filter = require('lodash/collection/filter');

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
  var id = _effectID++;
  _effects[id] = {id, sampleID, node};

}

var EffectStore = assign({}, BaseStore, {
  getAll: function (sampleID) {
    return filter(_effects, (effect) => {
      return effect.sampleID == sampleID;
    });
  },

  dispatcherIndex: Dispatcher.register((action) => {
    switch (action.actionType) {
      case EffectConstants.CREATE:
        create(action.sampleID, action.effectType);
        EffectStore.emitChange();
        break;
    }
  });
});

export default EffectStore;

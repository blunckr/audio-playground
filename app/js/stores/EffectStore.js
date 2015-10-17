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

function create(sampleID, type) {
  var node;
  switch (type) {
    case EffectConstants.TYPES.CONVOVLER_NODE:
      node = audio.createConvolver();
      break;
    case EffectConstants.TYPES.GAIN_NODE:
      node = audio.createGain();
      node.gain.value = 2;
      break;
  }
  var id = _effectID++;
  var index = EffectStore.getSampleEffects(sampleID).length;
  _effects[id] = {id, node, sampleID, index, type};
  SampleStore.rewireEffects(sampleID, EffectStore.getSampleEffects(sampleID));
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
    }
  }),
});

export default EffectStore;

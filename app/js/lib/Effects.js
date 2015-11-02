import {AudioContext} from '../lib/AudioApiProxy';

import forOwn from 'lodash/object/forOwn';
import keys from 'lodash/object/keys';

var effects = {
  Gain: {
    params: {
      gain: {
        min: 0,
        default: 1
      }
    },
    createNode() {
      return AudioContext.createGain();
    },
    applyParams(node, params) {
      node.gain.value = params.gain;
    }
  },

  StereoPanner: {
    params: {
      pan: {
        min: -1,
        max: 1,
        default: 0
      }
    },
    createNode() {
      return AudioContext.createStereoPanner();
    },
    applyParams(node, params) {
      node.pan.value = params.pan;
    }
  }
};

function getDefaultParams(params) {
  var defaultParams = {};
  forOwn(params, (param, name)=> {
    defaultParams[name] = param.default;
  });
  return defaultParams;
}

module.exports = {
  create(type) {
    var effect = effects[type];
    var node = effect.createNode();
    var params = getDefaultParams(effect.params);
    effect.applyParams(node, params);
    return [node, params];
  },

  update(type, node, params) {
    effects[type].applyParams(node, params);
  },

  list() {
    return keys(effects);
  }
};

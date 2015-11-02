import {AudioContext} from '../lib/AudioApiProxy';

import forOwn from 'lodash/object/forOwn';
import keys from 'lodash/object/keys';

var effects = {
  Distortion: {
    params: {
      k: {
        default: 400
      }
    },
    createNode() {
      return AudioContext.createWaveShaper();
    },
    applyParams(node, params) {
      // stolen from mozilla, who stole it from stack overflow
      var k = params.k,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
      for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
      }
      node.curve = curve;
      node.oversample = '4x';
    }
  },

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

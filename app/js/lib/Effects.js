import {AudioContext} from '../lib/AudioApiProxy';

import forOwn from 'lodash/object/forOwn';

function getDefaultParams(params) {
  var defaultParams = {};
  forOwn(params, (param, name)=> {
    defaultParams[name] = param.default;
  });
  return defaultParams;
}

module.exports = {
  Gain: {
    params: {
      gain: {
        min: 0,
        default: 1
      }
    },
    create() {
      var node = AudioContext.createGain();
      var params = getDefaultParams(this.params);
      this.applyParams(node, params);
      return [node, params];
    },
    applyParams(node, params) {
      node.gain.value = params.gain;
    }
  },

  StereoPanner: {
    params: {
      pan: {
        min: -1,
        max: 1
      }
    },
    build(node, params) {
      node.pan.value = params.pan;
    }
  }
};

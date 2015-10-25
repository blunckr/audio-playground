require("../../recorderjs/recorder.js"); // not a module, puts Recorder on the window

import BaseStore from './BaseStore';
import EffectStore from './EffectStore';
import Dispatcher from '../Dispatcher';
import SampleConstants from '../constants/SampleConstants';
import SampleActions from '../actions/SampleActions';
import AudioApiProxy from '../lib/AudioApiProxy';

var AudioContext = AudioApiProxy.AudioContext;

import assign from 'lodash/object/assign';
import map from 'lodash/collection/map';

var _samples = {}; // collection of sample items

var _newSample = null;
var _newSampleState = null;

var recorder = null;
var sampleID = 0;

AudioApiProxy.getUserMedia({audio: true},
  (stream) => {
    var source = AudioContext.createMediaStreamSource(stream);
    recorder = new Recorder(source, {workerPath: '/recorderjs/recorderWorker.js'});
  }, (err) => {
    alert('You need to give permission to use your microphone and refresh the page');
  }
);

function newSampleTemplate() {
  sampleID++;
  return {
    id: sampleID,
    name: `Sample  ${sampleID}`,
    loop: false,
    audioNode: null
  };
}

// these three functions run sequentially when a new sample is saved
function saveNewSampleBuffer(buffers) {
  var newBuffer = AudioContext.createBuffer(2, buffers[0].length, AudioContext.sampleRate);
  newBuffer.getChannelData(0).set(buffers[0]);
  newBuffer.getChannelData(1).set(buffers[1]);

  _newSample.buffer = newBuffer;
  recorder.exportWAV(saveNewSampleBlob);
}

function saveNewSampleBlob(blob) {
  _newSample.blobURL = URL.createObjectURL(blob);
  saveFinished();
}

function saveFinished() {
  recorder.clear();
  _newSampleState = null;
  _samples[_newSample.id] = _newSample;
  _newSample = null;
  SampleStore.emitChange();
}

function create() {
  recorder.record();
  _newSampleState = SampleConstants.IS_RECORDING;
}

function stopRecording() {
  recorder.stop();
  recorder.getBuffer(saveNewSampleBuffer);

  _newSample = newSampleTemplate();
  _newSampleState = SampleConstants.IS_SAVING;
}

function addAudioNode(id, audioNode) {
  _samples[id].audioNode = AudioContext.createMediaElementSource(audioNode);
  SampleStore.rewireEffects(id, []);
}

function toggleLooping(id) {
  _samples[id].loop = !_samples[id].loop;
}

function destroy(id) {
  delete _samples[id];
}

var SampleStore = assign({}, BaseStore, {

  getAll() {
    return _samples;
  },

  getNewSampleState() {
    return _newSampleState;
  },

  rewireEffects(id) {
    var effects = EffectStore.getSampleEffects(id);
    var sample = _samples[id];

    var nodes = map(effects, (effect) => {return effect.node});
    var prevEffect = sample.audioNode;
    nodes.forEach((nextEffect) => {
      prevEffect.disconnect();
      prevEffect.connect(nextEffect);
      prevEffect = nextEffect;
    });
    prevEffect.disconnect();
    prevEffect.connect(AudioContext.destination);
  },

  dispatcherIndex: Dispatcher.register((action) => {
    switch(action.actionType) {
      case SampleConstants.CREATE:
        create();
        SampleStore.emitChange();
        break;

      case SampleConstants.ADD_AUDIO_NODE:
        addAudioNode(action.id, action.audioNode);
        SampleStore.emitChange();
        break;

      case SampleConstants.STOP_RECORDING:
        stopRecording();
        SampleStore.emitChange();
        break;

      case SampleConstants.TOGGLE_LOOPING:
        toggleLooping(action.id);
        SampleStore.emitChange();
        break;

      case SampleConstants.DESTROY:
        destroy(action.id);
        SampleStore.emitChange();
        break;
      }
    return true; // No errors. Needed by promise in Dispatcher.
  })
});

export default SampleStore;

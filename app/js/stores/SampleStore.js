require("../../recorderjs/recorder.js"); // not a module, puts Recorder on the window

var {EventEmitter} = require('events');

var Dispatcher = require('../Dispatcher');
var SampleConstants = require('../constants/SampleConstants');
var SampleActions = require('../actions/SampleActions');

var assign = require('lodash/object/assign');
var each = require('lodash/collection/each');
var times = require('lodash/utility/times');

var CHANGE_EVENT = 'change';

var _samples = {}; // collection of sample items

var _newSample = null;
var _newSampleState = null;

var recorder = null;
var audio = new (AudioContext || webkitGetAudioContext)();
var sampleID = 0;

function newSampleTemplate() {
  sampleID++;
  return {
    id: sampleID,
    name: "Sample " + sampleID,
    loop: false
  }
}

function getUserMedia(options, success, error){
  if(navigator.mediaDevices != undefined) {
    navigator.mediaDevices.getUserMedia(options).then(success).catch(error);
  } else {
    navigator.webkitGetUserMedia(options, success, error);
  }
}

getUserMedia({audio: true},
  (stream) => {
    var source = audio.createMediaStreamSource(stream);
    recorder = new Recorder(source, {workerPath: '/recorderjs/recorderWorker.js'});
  }, (err) => {
    alert("You need to give permission to use your microphone and refresh the page");
    location.reload();
  }
);

function saveNewSampleBuffer(buffers) {
  var newBuffer = audio.createBuffer(2, buffers[0].length, audio.sampleRate);
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
  SampleStore.emitChange()
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

function toggleLooping(id) {
  _samples[id].loop = !_samples[id].loop;
}

// I feel like I will want this later
// function play(id) {
//   var sample = _samples[id];
//   var source = audio.createBufferSource();
//   source.buffer = sample.buffer;
//   source.connect(audio.destination);
//   source.start(0);
// }

function destroy(id) {
  delete _samples[id];
}

var SampleStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _samples;
  },

  getNewSampleState: function() {
    return _newSampleState;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: Dispatcher.register((action) => {
    var text;

    switch(action.actionType) {
      case SampleConstants.CREATE:
        create();
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

      // add more cases for other actionTypes, like UPDATE, etc.
      return true; // No errors. Needed by promise in Dispatcher.
    }
  })
});

export default SampleStore;

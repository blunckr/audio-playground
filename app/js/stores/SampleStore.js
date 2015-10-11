require("../../../vendor/recorderjs/recorder.js"); // not a module, puts Recorder on the window

var {EventEmitter} = require('events');

var Dispatcher = require('../Dispatcher');
var SampleConstants = require('../constants/SampleConstants');
var SampleActions = require('../actions/SampleActions');

var assign = require('lodash/object/assign');
var each = require('lodash/collection/each');
var times = require('lodash/utility/times');

var CHANGE_EVENT = 'change';

var _samples = {}; // collection of sample items
var _newSampleState = null;

var recorder = null;
var audio = new (AudioContext || webkitGetAudioContext)();
var channelCount = 2;

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
    recorder = new Recorder(source);
  }, (err) => {
    alert("You need to give permission to use your microphone and refresh the page");
    location.reload();
  }
);

function saveNewSample(buffers) {
  var newSource = audio.createBufferSource();
  var newBuffer = audio.createBuffer(2, buffers[0].length, audio.sampleRate);
  newBuffer.getChannelData(0).set(buffers[0]);
  newBuffer.getChannelData(1).set(buffers[1]);
  newSource.buffer = newBuffer;

  newSource.connect(audio.destination);
  newSource.start(0);
  _newSampleState = null;

  SampleStore.emitChange();
}

function create() {
  recorder.record();
  _newSampleState = SampleConstants.IS_RECORDING;
}

function stopRecording() {
  recorder.stop();
  recorder.getBuffer(saveNewSample);
  _newSampleState = SampleConstants.IS_SAVING;
}

function play(id) {
  var audio = new (AudioContext || webkitGetAudioContext)();
  var frameCount = audio.sampleRate * 2.0;
  var buffer = audio.createBuffer(channelCount, frameCount, audio.sampleRate);

  var sample = _samples[id];

  each(sample.buffer, (inChannel, i) => {
    var outChannel = buffer.getChannelData(i);
    times(frameCount, (frame) => {
      outChannel[frame] = inChannel[0][frame];
    });
  });

  var source = audio.createBufferSource();
  source.buffer = buffer;
  source.connect(audio.destination);
  source.start();
}

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

      case SampleConstants.PLAY:
        play(action.id);
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

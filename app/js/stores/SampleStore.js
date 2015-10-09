var {EventEmitter} = require('events');

var Dispatcher = require('../Dispatcher');
var SampleConstants = require('../constants/SampleConstants');
var SampleActions = require('../actions/SampleActions');

var assign = require('lodash/object/assign');

var CHANGE_EVENT = 'change';

var _samples = {}; // collection of sample items
var _newSample = null;
var _isRecording = false;

function create() {

  function getUserMedia(options, success, error){
    if(navigator.mediaDevices != undefined) {
      navigator.mediaDevices.getUserMedia(options).then(success).catch(error);
    } else {
      navigator.webkitGetUserMedia(options, success, error);
    }
  }

  getUserMedia({audio: true}, (stream) => {
    var audio = new (AudioContext || webkitGetAudioContext)();
    var source = audio.createMediaStreamSource(stream);
    var processor = audio.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = function(audioProcessingEvent) {
      console.log('HERE');
    }
    source.connect(processor);
    processor.connect(audio.destination); // this is for a bug in chrome. it won't play anything since the processor doesn't return anything
    _newSample = {
      stream: stream
    }
    // this could be done with the dispatcher and everything, not sure if that
    // is necessary
    SampleStore.emitChange()
  }, (err) => {
      alert("You need to give permission to use your microphone and refresh the page");
  });
  // that part is async, so we need to register some change
  _isRecording = true;
}

function stopRecording() {
  _newSample.stream.stop();
  _isRecording = false;

  var id = new Date()
  _newSample.id = id;
  _samples[new Date()] = _newSample;
  _newSample = null;
}

function play(id) {
  debugger;
  _samples[id].source.connect(audio.destination);
}

function destroy(id) {
  delete _samples[id];
}

var SampleStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _samples;
  },

  getNewSample: function() {
    return _newSample;
  },

  getIsRecording: function() {
    return _isRecording;
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
      case SampleConstants.SAMPLE_CREATE:
        create();
        SampleStore.emitChange();
        break;

      case SampleConstants.SAMPLE_STOP_RECORDING:
        stopRecording();
        SampleStore.emitChange();
        break;

      case SampleConstants.SAMPLE_PLAY:
        play(action.id);
        SampleStore.emitChange();
        break;

      case SampleConstants.SAMPLE_DESTROY:
        destroy(action.id);
        SampleStore.emitChange();
        break;

      // add more cases for other actionTypes, like SAMPLE_UPDATE, etc.
      return true; // No errors. Needed by promise in Dispatcher.
    }
  })
});

export default SampleStore;

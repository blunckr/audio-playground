var {EventEmitter} = require('events');

var Dispatcher = require('../Dispatcher');
var SampleConstants = require('../constants/SampleConstants');

var assign = require('lodash/object/assign');

var CHANGE_EVENT = 'change';

var _samples = {}; // collection of sample items

/**
 * Create a TODO item.
 * @param {string} text The content of the TODO
 */
function create(text) {
  // Using the current timestamp in place of a real id.
  var id = Date.now();
  _samples[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Delete a TODO item.
 * @param {string} id
 */
function destroy(id) {
  delete _samples[id];
}

var SampleStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _samples;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: Dispatcher.register((action) => {
    var text;

    switch(action.actionType) {
      case SampleConstants.SAMPLE_CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
          SampleStore.emitChange();
        }
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

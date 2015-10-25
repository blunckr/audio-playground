import {EventEmitter} from 'events';

import assign from 'lodash/object/assign';

var CHANGE_EVENT = 'change';

var BaseStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

export default BaseStore;

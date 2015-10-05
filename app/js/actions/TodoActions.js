var Dispatcher = require('../Dispatcher');
var TodoConstants = require('../constants/TodoConstants');

module.exports = {
  create: function(text) {
    Dispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      text: text
    });
  },

  destroy: function(id) {
    Dispatcher.handleViewAction({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  }
};

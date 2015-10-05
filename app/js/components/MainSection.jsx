var React = require('react');
var TodoItem = require ('./TodoItem.jsx');

export default class TodoApp extends React.Component {
  render() {
    var allTodos = this.props.allTodos;
    var todos = []
    for (var key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section id="main">
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  }
}

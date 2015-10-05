var React = require('react');

export default class TodoItem extends React.Component {
  render() {
    var todo = this.props.todo;

    return (
      <li>{todo.text}</li>
    );
  }
}

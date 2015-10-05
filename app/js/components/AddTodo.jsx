var React = require('react');
var TodoActions = require('../actions/TodoActions.js');

function cleanState(){
  return {
    value: ''
  };
}

export default class AddTodo extends React.Component {
  constructor() {
    super();
    this.state = cleanState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    TodoActions.create(this.state.value);
    this.setState(cleanState());
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </form>
    );
  }
}

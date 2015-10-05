var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var SampleActions = require('../actions/SampleActions.js');

function cleanState(){
  return {
    value: ''
  };
}

export default class SampleNew extends BaseComponent {
  constructor() {
    super();
    this.state = cleanState();
    this.bindFunctions(['handleSubmit', 'handleChange']);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    SampleActions.create(this.state.value);
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

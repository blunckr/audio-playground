var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var SampleActions = require('../actions/SampleActions');

export default class SampleItem extends BaseComponent {
  constructor() {
    super();
    this.bindFunctions(['handleDelete']);
  }

  handleDelete(event) {
    SampleActions.destroy(this.props.sample.id)
  }

  render() {
    var sample = this.props.sample;

    return (
      <li>
        <span>{sample.text}</span>
        <button onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
}

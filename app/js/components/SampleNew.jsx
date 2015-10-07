var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var SampleActions = require('../actions/SampleActions.js');

export default class SampleNew extends BaseComponent {
  constructor() {
    super();
    this.bindFunctions(['handleRecord', 'handleStop']);
  }

  handleRecord(e) {
    e.preventDefault();
    SampleActions.create();
  }

  handleStop(e) {
    e.preventDefault();
    SampleActions.stopRecording();
  }

  render() {
    if (!this.props.isRecording) {
      return <button onClick={this.handleRecord}>Record New Sample</button>
    } else if (this.props.isRecording && this.props.newSample == null) {
      return <p>Awaiting permission to record...</p>
    } else {
      return <button onClick={this.handleStop}>Stop Recording</button>
    }
  }
}

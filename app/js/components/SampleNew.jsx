var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var SampleActions = require('../actions/SampleActions');
var SampleConstants = require('../constants/SampleConstants');

var includes = require('lodash/collection/includes');

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
    switch (this.props.newSampleState) {
    case null:
      return <button onClick={this.handleRecord}>Record New Sample</button>
    case SampleConstants.IS_RECORDING:
      return <button onClick={this.handleStop}>Stop Recording</button>
    case SampleConstants.IS_SAVING:
      return <p>Saving...</p>
    }
  }
}

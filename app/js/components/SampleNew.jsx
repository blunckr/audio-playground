import React from 'react';
import BaseComponent from './BaseComponent.jsx';
import SampleActions from '../actions/SampleActions';
import SampleConstants from '../constants/SampleConstants';

export default class SampleNew extends BaseComponent {
  constructor() {
    super();
    this.bindFunctions(['handleRecord', 'handleStop', 'handleStoreChange']);
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
      return <button className="btn btn-primary" onClick={this.handleRecord}>Record New Sample</button>;
    case SampleConstants.IS_RECORDING:
      return <button className="btn btn-danger" onClick={this.handleStop}>Stop Recording</button>;
    case SampleConstants.IS_SAVING:
      return <p>Saving...</p>;
    }
  }
}

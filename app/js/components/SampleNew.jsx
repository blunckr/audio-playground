var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var SampleStore = require('../stores/SampleStore');
var SampleActions = require('../actions/SampleActions');
var SampleConstants = require('../constants/SampleConstants');

function getStoreState() {
  return {
    newSampleState: SampleStore.getNewSampleState()
  };
}

export default class SampleNew extends BaseComponent {
  constructor() {
    super();
    this.state = getStoreState();
    this.bindFunctions(['handleRecord', 'handleStop', 'handleStoreChange']);
    this.stores = [SampleStore];
  }

  handleRecord(e) {
    e.preventDefault();
    SampleActions.create();
  }

  handleStop(e) {
    e.preventDefault();
    SampleActions.stopRecording();
  }

  handleStoreChange() {
    this.setState(getStoreState());
  }

  render() {
    switch (this.state.newSampleState) {
    case null:
      return <button onClick={this.handleRecord}>Record New Sample</button>
    case SampleConstants.IS_RECORDING:
      return <button onClick={this.handleStop}>Stop Recording</button>
    case SampleConstants.IS_SAVING:
      return <p>Saving...</p>
    }
  }
}

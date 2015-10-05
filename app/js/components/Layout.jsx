var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');

var SampleNew = require('./SampleNew.jsx');
var SampleIndex = require('./SampleIndex.jsx');
var SampleStore = require('../stores/SampleStore');

function getSampleState() {
  return {
    allSamples: SampleStore.getAll()
  };
}

export default class SampleApp extends BaseComponent {

  constructor(){
    super();
    this.state = getSampleState()
    this.bindFunctions(['handleStoreChange']);
  }

  componentDidMount() {
    SampleStore.addChangeListener(this.handleStoreChange);
  }

  componentWillUnmount() {
    SampleStore.removeChangeListener(this.handleStoreChange);
  }

  /**
   * @return {object}
   */
  render() {
    return (
      <div>
        <SampleNew />
        <SampleIndex
          allSamples={this.state.allSamples}
          areAllComplete={this.state.areAllComplete}
        />
      </div>
    );
  }

  handleStoreChange() {
    this.setState(getSampleState());
  }
}

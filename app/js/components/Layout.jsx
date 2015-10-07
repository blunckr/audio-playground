var React = require('react');

var BaseComponent = require('./BaseComponent.jsx');

var SampleNew = require('./SampleNew.jsx');
var Sample = require('./Sample.jsx');

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
    var allSamples = this.state.allSamples;
    var samples = []
    for (var key in allSamples) {
      samples.push(<Sample key={key} sample={allSamples[key]} />);
    }

    return (
      <div>
        <ul id="sample-list">{samples}</ul>
        <SampleNew />
      </div>
    );
  }

  handleStoreChange() {
    this.setState(getSampleState());
  }
}

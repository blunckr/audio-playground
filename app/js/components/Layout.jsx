var React = require('react');

var BaseComponent = require('./BaseComponent.jsx');
var SampleNew = require('./SampleNew.jsx');
var Sample = require('./Sample.jsx');
var SampleStore = require('../stores/SampleStore');

var forOwn = require('lodash/object/forOwn');

function getSampleState() {
  return {
    allSamples: SampleStore.getAll(),
    newSampleState: SampleStore.getNewSampleState()
  };
}

export default class Layout extends BaseComponent {

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
    var samples = []
    forOwn(this.state.allSamples, (v, k) =>{
      samples.push(<Sample key={k} sample={v} />);
    });

    return (
      <div>
        <div id="samples">{samples}</div>
        <SampleNew newSampleState={this.state.newSampleState}/>
      </div>
    );
  }

  handleStoreChange() {
    this.setState(getSampleState());
  }
}

var React = require('react');

var BaseComponent = require('./BaseComponent.jsx');
var SampleNew = require('./SampleNew.jsx');
var Sample = require('./Sample.jsx');
var SampleStore = require('../stores/SampleStore');

var forOwn = require('lodash/object/forOwn');

function getStoreState() {
  return {
    allSamples: SampleStore.getAll()
  };
}

export default class Layout extends BaseComponent {

  constructor(){
    super();
    this.state = getStoreState();
    this.bindFunctions(['handleStoreChange']);
    this.stores = [SampleStore];
  }

  render() {
    var samples = [];
    forOwn(this.state.allSamples, (v, k) => {
      samples.push(<Sample key={k} sample={v} />);
    });

    return (
      <div>
        <div id="samples">{samples}</div>
        <SampleNew/>
      </div>
    );
  }

  handleStoreChange() {
    this.setState(getStoreState());
  }
}

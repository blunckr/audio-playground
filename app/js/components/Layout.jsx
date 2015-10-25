import React from 'react';

import BaseComponent from './BaseComponent.jsx';
import SampleNew from './SampleNew.jsx';
import Sample from './Sample.jsx';
import SampleStore from '../stores/SampleStore';

import forOwn from 'lodash/object/forOwn';

export default class Layout extends BaseComponent {
  constructor() {
    super();
    this.state = this.getStoreState();
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
        <SampleNew newSampleState={this.state.newSampleState}/>
      </div>
    );
  }

  getStoreState() {
    return {
      allSamples: SampleStore.getAll(),
      newSampleState: SampleStore.getNewSampleState()
    };
  }
}

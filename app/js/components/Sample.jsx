import React from 'react';
import BaseComponent from './BaseComponent.jsx';
import SampleActions from '../actions/SampleActions';
import EffectStore from '../stores/EffectStore';
import Effect from './Effect.jsx';
import EffectNew from './EffectNew.jsx';

import map from 'lodash/collection/map';

export default class Sample extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = this.getStoreState();
    this.stores = [EffectStore];
    this.bindFunctions(['handlePlay', 'handleDelete', 'handleLoopingChange', 'handleStoreChange']);
  }

  componentDidMount() {
    super.componentDidMount();
    var audioNode = React.findDOMNode(this.refs.audio);
    SampleActions.addAudioNode(this.props.sample.id, audioNode);
  }

  handlePlay() {
    SampleActions.play(this.props.sample.id);
  }

  handleDelete() {
    SampleActions.destroy(this.props.sample.id);
  }

  handleLoopingChange() {
    var sample = this.props.sample;
    SampleActions.toggleLooping(sample.id);
  }

  getStoreState() {
    return {
      effects: EffectStore.getSampleEffects(this.props.sample.id)
    };
  }

  render() {
    var sample = this.props.sample;
    var effects = map(this.state.effects, (effect) => {
      return <Effect key={effect.id} effect={effect}/>;
    });

    return (
      <div>
        <div className="h3">{sample.name}</div>
        <div className="form-inline">
          <audio src={sample.blobURL} controls='true' loop={sample.loop} ref="audio"/>
          <div className="checkbox">
            <label>
              <input type="checkbox" name="looping" value={sample.loop} onChange={this.handleLoopingChange}/> Looping?
            </label>
          </div>
          <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
        </div>

        <h4>Effects</h4>
        <div className="row">
          {effects}
        </div>

        <EffectNew sample={sample}/>
        <hr />
      </div>
    );
  }
}

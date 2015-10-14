var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var SampleActions = require('../actions/SampleActions');
var EffectStore = require('../stores/EffectStore');
var Effect = require('./Effect.jsx');
var EffectNew = require('./EffectNew.jsx');

var map = require('lodash/collection/map');

export default class Sample extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = this.getStoreState();
    this.stores = [EffectStore];
    this.bindFunctions(['handlePlay', 'handleDelete', 'handleLoopingChange', 'handleStoreChange']);
  }

  handlePlay(e) {
    SampleActions.play(this.props.sample.id);
  }

  handleDelete(e) {
    SampleActions.destroy(this.props.sample.id);
  }

  handleLoopingChange(e) {
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
      return <Effect effect={effect}/>;
    });

    return (
      <div>
        <audio src={sample.blobURL} controls='true' loop={sample.loop}/>
        <label><input type="checkbox" name="looping" value={sample.loop} onChange={this.handleLoopingChange}/>Looping?</label>
        <button onClick={this.handleDelete}>Delete</button>
        {effects}
        <EffectNew sample={sample}/>
        <hr />
      </div>
    );
  }
}

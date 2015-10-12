var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var SampleActions = require('../actions/SampleActions');

export default class SampleItem extends BaseComponent {
  constructor() {
    super();
    this.bindFunctions(['handlePlay', 'handleDelete', 'handleLoopingChange']);
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

  render() {
    var sample = this.props.sample;
    return (
      <li>
        <audio src={sample.blobURL} controls='true' loop={sample.loop}/>
        <label><input type="checkbox" name="looping" value={sample.loop} onChange={this.handleLoopingChange}/>Looping?</label>
        <button onClick={this.handleDelete}>Delete</button>
      </li>
    );
  }
}

var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var EffectActions = require('../actions/EffectActions');
var EffectConstants = require('../constants/EffectConstants');

export default class Effect extends BaseComponent {
  constructor() {
    super();
    this.bindFunctions([]);
  }

  render() {
    return(
      <div>
        <p>{this.props.effect.type}</p>
      </div>
    );
  }
}

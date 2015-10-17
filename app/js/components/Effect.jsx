var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var EffectParam = require('./EffectParam.jsx');
var EffectActions = require('../actions/EffectActions');
var EffectConstants = require('../constants/EffectConstants');

var forOwn = require('lodash/object/forOwn');

export default class Effect extends BaseComponent {
  constructor() {
    super();
    this.bindFunctions([]);
  }

  render() {
    var paramNodes = [];
    forOwn(this.props.effect.params, (param, k) => {
      paramNodes.push(<EffectParam key={k} param={param} paramID={k} effectID={this.props.effect.id}/>);
    });

    return(
      <div>
        <p>
          {this.props.effect.type}
          {paramNodes}
        </p>
      </div>
    );
  }
}

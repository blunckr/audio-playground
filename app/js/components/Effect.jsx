import React from 'react';
import BaseComponent from './BaseComponent.jsx';
import EffectParam from './EffectParam.jsx';

import forOwn from 'lodash/object/forOwn';

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
        {this.props.effect.type}
        {paramNodes}
      </div>
    );
  }
}

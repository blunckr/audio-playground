import React from 'react';
import BaseComponent from './BaseComponent.jsx';
import EffectParam from './EffectParam.jsx';
import EffectActions from '../actions/EffectActions';

import forOwn from 'lodash/object/forOwn';

export default class Effect extends BaseComponent {
  constructor() {
    super();
    this.bindFunctions(['handleDelete']);
  }

  handleDelete(){
    EffectActions.destroy(this.props.effect.id);
  }

  render() {
    var paramNodes = [];
    forOwn(this.props.effect.params, (param, k) => {
      paramNodes.push(<EffectParam key={k} param={param} paramID={k} effectID={this.props.effect.id}/>);
    });

    return(
      <div className="col-sm-3">
        <h4>{this.props.effect.type}</h4>
        {paramNodes}
        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

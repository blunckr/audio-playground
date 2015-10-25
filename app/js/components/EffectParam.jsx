import React from 'react';
import BaseComponent from './BaseComponent.jsx';
import EffectActions from '../actions/EffectActions';
import EffectConstants from '../constants/EffectConstants';

export default class EffectParam extends BaseComponent {
  constructor() {
    super();
    this.bindFunctions(['handleValueChange']);
  }

  handleValueChange(e) {
    EffectActions.updateParam(this.props.effectID, this.props.paramID, e.target.value);
  }

  render() {
    return(
      <span>
        {this.props.param.name}:
        <input type="number" value={this.props.param.value} onChange={this.handleValueChange}/>
      </span>
    );
  }
}

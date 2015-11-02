import React from 'react';
import BaseComponent from './BaseComponent.jsx';
import EffectActions from '../actions/EffectActions';

export default class EffectParam extends BaseComponent {
  constructor() {
    super();
    this.bindFunctions(['handleValueChange']);
  }

  handleValueChange(e) {
    EffectActions.updateParam(this.props.effectID, this.props.name, e.target.value);
  }

  render() {
    return(
      <div className="form-group">
        <label>{this.props.name}</label>
        <input className="form-control" type="number" value={this.props.param} onChange={this.handleValueChange}/>
      </div>
    );
  }
}

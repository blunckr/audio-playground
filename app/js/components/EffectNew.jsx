import React from 'react';
import BaseComponent from './BaseComponent.jsx';
import EffectActions from '../actions/EffectActions';

export default class EffectNew extends BaseComponent {
  constructor() {
    super();
    this.state = this.defaultState();
    this.bindFunctions(['handleNodeTypeChange', 'handleCreate']);
  }

  defaultState(){
    return { nodeType: '' };
  }

  handleNodeTypeChange(e) {
    this.setState({nodeType: e.target.value});
  }

  handleCreate() {
    if(this.state.nodeType != ''){
      EffectActions.create(this.props.sample.id, this.state.nodeType);
      this.setState(this.defaultState());
    }
  }

  render() {
    var nodeTypeOptions = this.props.effectTypes.map((effect)=>{
      return (<option key={effect} value={effect}>{effect}</option>);
    });

    return(
      <div className="form-inline">
        <select className="form-control" onChange={this.handleNodeTypeChange} value={this.state.nodeType}>
          <option value=''>-</option>
          {nodeTypeOptions}
        </select>
        <button className="btn btn-primary" onClick={this.handleCreate}>Create New Effect</button>
      </div>
    );
  }
}

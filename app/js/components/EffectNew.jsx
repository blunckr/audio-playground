var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var EffectActions = require('../actions/EffectActions');
var EffectConstants = require('../constants/EffectConstants');

var forOwn = require('lodash/object/forOwn');

export default class EffectNew extends BaseComponent {
  constructor() {
    super();
    this.state = this.defaultState();
    this.bindFunctions(['handleNodeTypeChange', 'handleCreate']);
  }

  defaultState(){
    return {nodeType: EffectConstants.TYPES.GAIN_NODE};
  }

  handleNodeTypeChange(e) {
    this.setState({nodeType: e.target.value});
  }

  handleCreate(e) {
    debugger
    EffectActions.create(this.props.sample.id, this.state.nodeType);
    this.setState(this.defaultState());
  }

  render() {
    var nodeTypeOptions = [];
    forOwn(EffectConstants.TYPES, (v, k) => {
      nodeTypeOptions.push(<option key={k} value={v}>{v}</option>);
    });

    return(
      <div>
        <select onChange={this.handleNodeTypeChange} value={this.state.nodeType}>{nodeTypeOptions}</select>
        <button onClick={this.handleCreate}>Create New Effect</button>
      </div>
    );
  }
}

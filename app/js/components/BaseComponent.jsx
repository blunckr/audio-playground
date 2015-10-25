import React from 'react';

export default class BaseComponent extends React.Component {
  bindFunctions (functions){
    functions.forEach((f) => {
      this[f] = this[f].bind(this);
    });
  }

  componentDidMount() {
    if(this.stores){
      this.stores.forEach((store) => {
        store.addChangeListener(this.handleStoreChange);
      });
    }
  }

  componentWillUnmount() {
    if(this.stores){
      this.stores.forEach((store) => {
        store.removeChangeListener(this.handleStoreChange);
      });
    }
  }

  handleStoreChange() {
    this.setState(this.getStoreState());
  }
}

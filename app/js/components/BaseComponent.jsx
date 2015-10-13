var React = require('react');

var each = require('lodash/collection/each');

export default class BaseComponent extends React.Component {
  bindFunctions (functions){
    functions.forEach((f) => {
      this[f] = this[f].bind(this);
    });
  }

  componentDidMount() {
    each(this.stores, (store) => {
      store.addChangeListener(this.handleStoreChange);
    });
  }

  componentWillUnmount() {
    each(this.stores, (store) => {
      store.removeChangeListener(this.handleStoreChange);
    });
  }

}

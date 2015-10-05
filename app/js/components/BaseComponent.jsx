var React = require('react');

export default class BaseComponent extends React.Component {
  bindFunctions (functions){
    functions.forEach((f) => {
      this[f] = this[f].bind(this);
    });
  }
}

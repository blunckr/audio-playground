var React = require('react');

export default class Footer extends React.Component {
  render() {
    var allTodos = this.props.allTodos;
    return (
      <div id="footer">
        <hr />
        <p>{Object.keys(allTodos).length} items left</p>
      </div>
    );
  }
}

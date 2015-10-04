var React = require('react');

export default class Test extends React.Component {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
}

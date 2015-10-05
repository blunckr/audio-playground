var React = require('react');
var BaseComponent = require('./BaseComponent.jsx');
var Sample = require ('./Sample.jsx');

export default class SampleIndex extends BaseComponent {
  render() {
    var allSamples = this.props.allSamples;
    var samples = []
    for (var key in allSamples) {
      samples.push(<Sample key={key} sample={allSamples[key]} />);
    }

    return (
      <section id="main">
        <ul id="sample-list">{samples}</ul>
      </section>
    );
  }
}

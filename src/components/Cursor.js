import React, { PropTypes } from 'react';

const Cursor = React.createClass({
  getInitialState: function () {
    return {
      blink: 0
    };
  },
  componentDidMount: function() {
    this.blinkInterval = setInterval(function blink() {
      if (this.state.blink === 0) {
        this.setState({blink: 1});
      } else {
        this.setState({blink: 0});
      }
    }.bind(this), 500);
  },
  componentWillUnmount: function() {
    clearInterval(this.blinkInterval);
  },
  render () {
    var style = {};
    if (this.state.blink === 0) {
      style.color = 'rgba(0, 0, 0, 0)';
    } else {
      style.color = false;
    }
    return <span style={style}>&#9608;</span>;
  }
});

export default Cursor;

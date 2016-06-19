import React, { PropTypes } from 'react';
import Cursor from './components/Cursor';
import commands from './commands';

const Terminal = React.createClass({
  getInitialState: function() {
    return {
      lines: [
        {
          text: "Welcome to buttram.net! Type 'help' for instructions.",
          source: 'SYSTEM'
        },
        {
          text: "",
          source: 'USER'
        }
      ],
      currentLine: 1
    };
  },
  componentDidMount: function() {

  },
  onKey: function(e) {
    var lines = this.state.lines;
    switch(e.keyCode) {
      case 8: //backspace
        e.preventDefault();
        e.stopPropagation();
        lines[this.state.currentLine].text = lines[this.state.currentLine].text.substr(0, lines[this.state.currentLine].length - 1);
        this.setState({lines});
      break;
      case 13: //enter key
        var output = commands.processCommand(lines[this.state.currentLine].text);
        var linesForward = 1;
        if (!Array.isArray(output)) {
          lines.push({text: `${output}`, source: 'SYSTEM'});
          linesForward = 1;
        } else {
          output.forEach(function(line) {
            lines.push({text: `${line}`, source: 'SYSTEM'});
            linesForward += 1;
          });
        }
        lines.push({text: "", source: 'USER'});
        this.setState({lines, currentLine: this.state.currentLine+linesForward});
      break;
      default:
        console.log(e.keyCode);
        lines[this.state.currentLine].text += String.fromCharCode(e.keyCode);
        this.setState({lines});
    }
  },
  termRef: function (ref) {
    ref.focus();
  },
  render () {
    var termOutput = '';
    termOutput = this.state.lines.map(function renderLines(line, index) {
      var cursor = '';
      var prompt = '';
      if (this.state.currentLine === index) {
        cursor = <Cursor/>;
      }
      if (line.source === 'USER') {
        prompt = '> ';
      }
      return <span key={index} className="term-line">{prompt}{line.text}{cursor}<br/></span>;
    }.bind(this));
    return (
      <div className="terminal-main" ref={this.termRef} onKeyDown={this.onKey} tabIndex="1">
        {termOutput}
      </div>
    );
  }
});

export default Terminal;

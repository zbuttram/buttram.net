import React, { PropTypes } from 'react';
import Cursor from './components/Cursor';
import commands from './commands';
import $ from 'jquery';
import Remarkable from 'remarkable';

var md = new Remarkable({
  // html: true,
  linkify: true,
  linkTarget: '_blank',
  breaks: true
});

const Terminal = React.createClass({
  getInitialState: function() {
    return {
      lines: [
        {
          text: "ZBUTTRAM | Welcome, User! Type 'HELP' for instructions or 'ABOUT' for info.",
          source: 'SYSTEM'
        },
        {
          text: "",
          source: 'USER'
        }
      ],
      currentLine: 1,
      lastCommand: ''
    };
  },
  componentDidMount: function() {
    $('#app').on('click', function() {
      this.term.focus();
    }.bind(this));
  },
  onKeyPress: function(e) {
    var lines = this.state.lines;
    switch(e.charCode) {
      case 13: //enter key
        var command = lines[this.state.currentLine].text;
        this.setState({lastCommand: command});
        if (command === 'CLS') {
          lines = [];
        } else if (command !== '') {
          var output = commands.processCommand(command);
          var linesForward = 1;
          if (!Array.isArray(output)) {
            var text = md.render(output);
            lines.push({text: `${text}`, source: 'SYSTEM'});
            linesForward = 1;
          } else {
            output.forEach(function(line) {
              var text = md.render(line);
              lines.push({text: `${text}`, source: 'SYSTEM'});
              linesForward += 1;
            });
          }
        }
        lines.push({text: "", source: 'USER'});
        this.setState({lines, currentLine: lines.length-1});
        window.setTimeout(function() {
          window.location.hash = '#b';
          window.location.hash = '#';
          this.term.focus();
        }.bind(this), 200);
      break;

      default:
        // console.log(e.charCode);
        lines[this.state.currentLine].text += String.fromCharCode(e.charCode).toUpperCase();
        this.setState({lines});
    }
  },
  onKeyDown: function(e) {
    var lines = this.state.lines;
    switch(e.keyCode) {

      case 8: //backspace
      e.preventDefault();
      e.stopPropagation();
      lines[this.state.currentLine].text = lines[this.state.currentLine].text.substr(0, lines[this.state.currentLine].text.length - 1);
      this.setState({lines});
      break;

      case 38: // up arrow
      lines[this.state.currentLine].text = this.state.lastCommand;
      this.setState({lines});
      break;
    }
  },
  termRef: function (ref) {
    this.term = ref;
    ref.focus();
  },
  render () {
    var termOutput = '';
    termOutput = this.state.lines.map(function renderLines(line, index) {
      var cursor = '';
      var prompt = '';
      var id = false;
      if (this.state.currentLine === index) {
        cursor = <Cursor/>;
        id = 'b';
      }
      if (line.source === 'USER') {
        prompt = '> ';
      }
      return <span key={index} className="term-line" id={id}>{prompt}<span dangerouslySetInnerHTML={{__html: line.text}}></span>{cursor}<br/></span>; // eslint-disable-line
    }.bind(this));
    return (
      <div className="terminal-main" ref={this.termRef} onKeyDown={this.onKeyDown} onKeyPress={this.onKeyPress} tabIndex="1">
        {termOutput}
      </div>
    );
  }
});

export default Terminal;

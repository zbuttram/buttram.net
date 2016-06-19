import React, { PropTypes } from 'react';
import Cursor from './components/Cursor';
import $ from 'jquery';

import Remarkable from 'remarkable';
var md = new Remarkable({
  // html: true,
  linkify: true,
  linkTarget: '_blank',
  breaks: true
});

import isMobile from './utils/isMobile';

const Terminal = React.createClass({
  getInitialState: function() {
    if (isMobile.any) {
      return {
        lines: [
          {
            text: commands.motd(),
            source: 'SYSTEM'
          },
          {
            text: "MOBILE",
            source: 'USER'
          },
          {
            text: commands.mobile(),
            source: 'SYSTEM'
          },
          {
            text: "",
            source: 'USER'
          }
        ],
        currentLine: 3,
        lastCommand: ''
      };
    } else {
      return {
        lines: [
          {
            text: commands.motd(),
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
    }
  },
  componentDidMount: function() {
    $('.terminal-main').focus();
    $('#app').click(function() {
      // $('#fakeInput').trigger('click');
      $('.terminal-main').focus();
    });
  },
  onKeyPress: function(e) {
    var processCommand = this.props.processCommand;
    var lines = this.state.lines;
    switch(e.charCode) {
      case 13: //enter key
        var command = lines[this.state.currentLine].text;
        this.setState({lastCommand: command});
        if (command === 'CLS') {
          lines = [];
        } else if (command !== '') {
          var output = processCommand(command);
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
        }
        lines.push({text: "", source: 'USER'});
        this.setState({lines, currentLine: lines.length-1});
        window.setTimeout(function() {
          window.location.hash = '#b';
          window.location.hash = '#';
          $('.terminal-main').focus();
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
        // prompt = '[user@buttram.net ~] $ ';
      }
      var text = line.text;
      if (line.source === 'SYSTEM') {
        text = md.render(text);
      }
      return <span key={index} className="term-line" id={id}>{prompt}<span dangerouslySetInnerHTML={{__html: text}}></span>{cursor}<br/></span>; // eslint-disable-line
    }.bind(this));
    return (
      <div className="terminal-main" onKeyDown={this.onKeyDown} onKeyPress={this.onKeyPress} tabIndex="1">
        {/*<input id='fakeInput' type='text'/>*/}
        {termOutput}
      </div>
    );
  }
});

export default Terminal;

/*
  BUTTRAM.NET ENTRY POINT
*/

require('./scss/index.scss');
require('babel-polyfill'); //required for IE support!

import React from 'react';
import { render } from 'react-dom';
import Terminal from './Terminal';
import commands from './commands';

render(<Terminal processCommand={commands.processCommand}/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}

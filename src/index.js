/*
  BUTTRAM.NET ENTRY POINT
*/

require('./scss/index.scss');
require('babel-polyfill'); //required for IE support!

import React from 'react';
import { render } from 'react-dom';
import Terminal from './Terminal';

render(<Terminal/>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}

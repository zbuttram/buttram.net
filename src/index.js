/*
  BUTTRAM.NET ENTRY POINT
*/

require('babel-polyfill'); //required for IE support!

import React from 'react';
import { render } from 'react-dom';

render(<div>Hello World!</div>, document.getElementById('app'));

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import Terminal from './src/Terminal';
import commands from './src/commands';
import sass from 'node-sass';

var style = sass.renderSync({
  file: path.resolve(__dirname, 'src/scss/index.scss')
});

var app = ReactDOMServer.renderToString(<Terminal static={true} commands={commands} processCommand={commands.processCommand}/>);

var html = `
<html>
<head>
<title>Zach Buttram</title>
<style>${style.css}</style>
</head>
<body>
<div id="app">${app}</div>
<script src="/assets/app.js"></script>
</body>
</html>
`;

fs.writeFile(path.resolve(__dirname, 'dist/index.html'), html);

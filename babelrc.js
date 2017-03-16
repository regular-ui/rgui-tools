'use strict';

const fs = require('fs');
const json = JSON.parse(fs.readFileSync(__dirname + '/.babelrc', 'utf8'));
json.presets = json.presets.map((preset) => require.resolve('babel-preset-' + preset));
json.babelrc = false;

module.exports = json;

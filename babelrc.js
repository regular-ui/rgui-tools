'use strict';

let fs = require('fs');
let json = JSON.parse(fs.readFileSync(__dirname + '/.babelrc', 'utf8'));
json.presets = json.presets.map((preset) => {
    return require.resolve('babel-preset-' + preset);
});

module.exports = json;

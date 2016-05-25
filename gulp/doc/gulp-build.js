'use strict';

let gutil = require('gulp-util');
let PluginError = gutil.PluginError;
let chalk = require('chalk');
let through2 = require('through2');

let fs = require('fs');
let path = require('path');

let ejs = require('ejs');
let babel = require('babel-core');
let babelConfig = require('../../babelrc.js');
let premark = require('./premark.js');
let markdown = require('./markdown.js');
let templates = require('./views.js');

module.exports = function(options) {
    options = options || {verbose: true};

    return through2.obj(function(file, enc, cb) {
        if (file.isNull())
            return cb(null, file);
        else if(file.isStream())
            throw new PluginError('gulp-build', 'Streaming not supported');

        let data = {
            assetsPath: 'http://regular-ui.github.io/',
            script: ''
        };

        data.content = file.contents.toString();
        let tpl = templates.head + '<div class="g-bd"><div class="g-bdc">' + templates.main + '</div></div>' + templates.foot;

        // 对markdown中的示例进行预处理
        let result = premark.premark(data.content);
        try {
            data.script = babel.transform(result.script, babelConfig).code;
        } catch(e) {
            data.script = result.script;
            console.error('Babel transform error:', e, file.path);
        }
        data.content = markdown(result.content);

        let html;
        try {
            html = ejs.render(tpl, data);
        } catch(e) {
            html = tpl;
            console.error('Render ejs error:', e, file.path);
        }

        // 变更路径，修改file
        file.base = file.cwd;
        file.path = file.path.replace(/demo\/(.+)\.\w+$/, '$1.html');
        file.contents = new Buffer(html);

        options.verbose && console.log(chalk.blue('Build doc:'), 'doc/' + path.relative(file.base, file.path));

        cb(null, file);
    });
}

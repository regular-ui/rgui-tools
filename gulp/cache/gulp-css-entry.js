'use strict';

const fs = require('fs');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const through2 = require('through2');

module.exports = function(options) {
    options = Object.assign({}, options || {});

    return through2.obj((file, enc, cb) => {
        if (file.isNull())
            return cb(null, file);
        else if (file.isStream())
            throw new PluginError('gulp-wrap', 'Streaming not supported');

        const contents = [`@import 'entry-css/index.mcss';\n`];

        try {
            const pkg = JSON.parse(file.contents.toString());
            for(let dependency in pkg.dependencies) {
                const mcsspath = `./node_modules/${dependency}/index.mcss`;
                if(/^rgui-/.test(dependency) && fs.existsSync(mcsspath))
                    contents.push(`@import '${dependency}/index.mcss';\n`);
            }
        } catch(e) {
            console.error(e);
        }
        if (fs.existsSync('./index.mcss'))
            contents.push(`@import '../../index.mcss';\n`);

        file.contents = new Buffer(contents.join(''));
        file.path = file.path.replace('package.json', 'index.mcss');
        cb(null, file);
    });
}

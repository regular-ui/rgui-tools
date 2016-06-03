'use strict';

let gutil = require('gulp-util');
let PluginError = gutil.PluginError;
let through2 = require('through2');

module.exports = function(options) {
    options = options || {};

    return through2.obj((file, enc, cb) => {
        if (file.isNull())
            return cb(null, file);
        else if(file.isStream())
            throw new PluginError('gulp-wrap', 'Streaming not supported');

        let contents = [];
        try {
            let pkg = JSON.parse(file.contents.toString());
            for(let dependency in pkg.dependencies) {
                if(/^rgui-/.test(dependency))
                    contents.push(`export * from '${dependency}';\n`);
            }
        } catch(e) {
            console.error(e);
        }
        contents.push(`export * from '../../index.js';\n`);

        file.contents = new Buffer(contents.join(''));
        file.path = file.path.replace('package.json', 'index.js');
        cb(null, file);
    });
}

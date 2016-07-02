'use strict';

let gulp = require('gulp');
let program = gulp.program || {};
let Server = require('karma').Server;

gulp.task('test-copy', (done) => {
    return gulp.src(require.resolve('./entry-js/index.js'))
        .pipe(gulp.dest('./.rgui-cache/test'));
});

gulp.task('test', ['test-copy'], (done) => {
    let config = {configFile: require.resolve('../../karma.conf.js')};

    if(program.online) {
        config.singleRun = true;
        config.reporters = ['mocha', 'coverage', 'coveralls'];
    }

    if(program.singleRun)
        config.singleRun = program.singleRun;
    if(program.browsers)
        config.browsers = program.browsers.split(',');
    if(program.reporters)
        config.reporters = program.reporters.split(',');
    if(program.verbose)
        config.webpackMiddleware = {};

    new Server(config, (code) => process.exit(code)).start();
});

'use strict';

let gulp = require('gulp');
let program = gulp.program;
let Server = require('karma').Server;

gulp.task('test-copy', (done) => {
    return gulp.src(require.resolve('./entry-js/index.js'))
        .pipe(gulp.dest('./.rgui-cache/test'));
});

gulp.task('test', ['test-copy'], (done) => {
    new Server({
        configFile: require.resolve('../../karma.conf.js'),
        singleRun: program.singleRun
    }, (exitCode) => done()).start();
});

'use strict';

const fs = require('fs');
const gulp = require('gulp');
const rm = require('gulp-rimraf');
const concatFilenames = require('gulp-concat-filenames');
const Server = require('karma').Server;

/**
 * Test clean
 */
gulp.task('test-clean', (done) => {
    return gulp.src(['./test-reports', './.rgui-cache/test'], { read: false }).pipe(rm());
});

gulp.task('test-entry', ['test-clean'], (done) => {
    return gulp.src('./*/test/*.js', { read: false })
        .pipe(concatFilenames('index.js', {
            template: (filename) => `import '${filename}';`,
        }))
        .pipe(gulp.dest('./.rgui-cache/test'));
});

/**
 * Test
 */
gulp.task('test', ['test-entry'], (done) => {
    // 如果没有测试用例则直接跳过
    if (!fs.existsSync('./.rgui-cache/test/index.js')) {
        console.log('Cannot find any tests, and skip `test` task');
        return done();
    }

    const config = { configFile: require.resolve('../../karma.conf.js') };

    if (settings.watch) {
        config.autoWatch = true;
        config.singleRun = false;
    }

    if(settings.online) {
        config.singleRun = true;
        config.reporters = ['mocha', 'coverage', 'coveralls'];
    }

    if(settings.browsers)
        config.browsers = settings.browsers.split(',');
    if(settings.reporters)
        config.reporters = settings.reporters.split(',');

    if(settings.verbose)
        config.webpackMiddleware = {};

    new Server(config, (code) => done(code ? 'Test failed' : '')).start();
});

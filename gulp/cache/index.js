'use strict';

const gulp = require('gulp');

const sequence = require('run-sequence');
const rm = require('gulp-rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const mcss = require('gulp_mcss');
const webpack = require('gulp-webpack');

const jsEntry = require('./gulp-js-entry.js');
const cssEntry = require('./gulp-css-entry.js');
const webpackConf = require('../../webpack.conf.js');

// @TODO: JS和MCSS流程统一

/**
 * Cache clean
 */
gulp.task('cache-clean', (done) => {
    return gulp.src('./.rgui-cache', { read: false }).pipe(rm());
});

/**
 * Cache JS
 */
gulp.task('cache-js', (done) => {
    const webpackConfig = webpackConf();

    if (settings.watch) {
        webpackConfig.watch = true;
        webpackConfig.devtool = 'eval';
    }

    const stream = gulp.src('./package.json')
        .pipe(jsEntry())
        .pipe(gulp.dest('./.rgui-cache/js'))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./doc/js'));

    if (settings.compress || settings.online) {
        stream.pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./doc/js'));
    }

    return stream;
});
gulp.task('cache-js-watch', ['cache-js']);

/**
 * Cache CSS
 */
gulp.task('cache-css', (done) => {
    const stream = gulp.src('./package.json')
        .pipe(cssEntry())
        .pipe(gulp.dest('./.rgui-cache/css'))
        .pipe(mcss({
            pathes: [__dirname + '/../../node_modules/mass', __dirname, './node_modules'],
            importCSS: true
        }))
        .pipe(gulp.dest('./doc/css'));

    if (settings.compress || settings.online) {
        stream.pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./doc/css'));
    }

    return stream;
});
gulp.task('cache-css-watch', ['cache-css'], (done) => gulp.watch('**/*.mcss', ['cache-css']));

/**
 * Cache
 */
gulp.task('cache', settings.watch ? ['cache-js-watch', 'cache-css-watch'] : ['cache-js', 'cache-css']);


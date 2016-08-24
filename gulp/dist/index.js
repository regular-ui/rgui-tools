'use strict';

const gulp = require('gulp');

const sequence = require('run-sequence');
const rm = require('gulp-rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const mcss = require('gulp_mcss');
const webpack = require('gulp-webpack');

const webpackConf = require('../../webpack.conf.js');

// @TODO: JS和MCSS流程统一

/**
 * Dist clean
 */
gulp.task('dist-clean', (done) => {
    return gulp.src('./dist', { read: false }).pipe(rm());
});

/**
 * Dist JS
 */
gulp.task('dist-js', (done) => {
    const webpackConfig = webpackConf({
        output: {
            filename: settings.output + '.js',
            library: settings.library,
            libraryTarget: 'umd'
        },
        devtool: settings.devtool,
    });

    if (settings.watch) {
        webpackConfig.watch = true;
        webpackConfig.devtool = 'eval';
    }

    if (settings.devtool)
        webpackConfig.devtool = settings.devtool;

    const stream = gulp.src('./index.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist/js'));

    if (settings.compress || settings.online) {
        stream.pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
    }

    return stream;
});
gulp.task('dist-js-watch', ['dist-js']);

/**
 * Dist CSS
 */
gulp.task('dist-css', (done) => {
    const stream = gulp.src('./index.mcss')
        .pipe(mcss({
            watch: true,
            pathes: [__dirname + '/../../node_modules/mass', './node_modules'],
            importCSS: true
        }))
        .pipe(rename({ basename: settings.output }))
        .pipe(gulp.dest('./dist/css'));

    if (settings.compress || settings.online) {
        stream.pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./dist/css'));
    }

    return stream;
});
gulp.task('dist-css-watch', ['dist-css'], (done) => gulp.watch('**/*.mcss', ['dist-css']));

/**
 * Dist
 */
gulp.task('dist', (done) => {
    sequence('dist-clean', settings.watch ? ['dist-js-watch', 'dist-css-watch'] : ['dist-js', 'dist-css'], done);
});

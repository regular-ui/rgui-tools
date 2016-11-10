'use strict';

const fs = require('fs');
const gulp = require('gulp');
const gulpIf = require('gulp-if');

const sequence = require('run-sequence');
const rm = require('gulp-rimraf');
const rename = require('gulp-rename');
const concatFilenames = require('gulp-concat-filenames');
const header = require('gulp-header');
const footer = require('gulp-footer');
const file = require('gulp-file');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-minify-css');
const mcss = require('gulp_mcss');
const webpack = require('gulp-webpack');

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

    let stream;

    if (settings.independent)
        stream = file('index.js', '', { src: true });
    else {
        stream = gulp.src('./node_modules/rgui-*/index.js')
            .pipe(concatFilenames('index.js', {
                template: (filename) => `export * from '${filename}';`,
            }))
            .pipe(gulpIf((file) => file.isNull(), file('index.js', '')));
    }

    stream = stream.pipe(footer(`export * from '../../index.js';\n`))
        .pipe(gulp.dest('./.rgui-cache/js'))
        .pipe(webpack(webpackConfig));

    if (settings.compress || settings.online) {
        // stream = stream.pipe(rename({ suffix: '.min' }))
        stream = stream.pipe(uglify());
    }

    return stream.pipe(gulp.dest('./doc/js'));
});
gulp.task('cache-js-watch', ['cache-js']);

/**
 * Cache CSS
 */
gulp.task('cache-css', (done) => {
    let stream;
    if (settings.independent)
        stream = file('index.mcss', '', { src: true });
    else {
        stream = gulp.src('./node_modules/rgui-*/index.mcss')
            .pipe(concatFilenames('index.mcss', {
                template: (filename) => `@import '${filename}';`,
            }))
            .pipe(gulpIf((file) => file.isNull(), file('index.mcss', '')))
    }

    stream = stream.pipe(header(`@import 'entry-css/index.mcss';\n`))
        .pipe(footer(`@import '../../index.mcss';\n`))
        .pipe(gulp.dest('./.rgui-cache/css'))
        .pipe(mcss({
            pathes: [__dirname + '/../../node_modules/mass', __dirname, './node_modules'],
            importCSS: true
        }));

    if (settings.compress || settings.online) {
        // stream = stream.pipe(rename({ suffix: '.min' }))
        stream = stream.pipe(minifycss());
    }

    return stream.pipe(gulp.dest('./doc/css'));
});
gulp.task('cache-css-watch', ['cache-css'], (done) => gulp.watch('**/*.mcss', ['cache-css']));

/**
 * Cache
 */
gulp.task('cache', settings.watch ? ['cache-js-watch', 'cache-css-watch'] : ['cache-js', 'cache-css']);


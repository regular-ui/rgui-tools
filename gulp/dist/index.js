'use strict';

let gulp = require('gulp');

let rm = require('gulp-rimraf');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let minifycss = require('gulp-minify-css');
let mcss = require('gulp_mcss');
let webpack = require('gulp-webpack');

let webpackConfig = require('./cache/webpack.config.js');

gulp.task('dist-clean', (done) => {
    return gulp.src('./dist', {read: false}).pipe(rm());
});

gulp.task('dist-js', (done) => {
    return gulp.src('./index.js')
        .pipe(webpack(webpackConfig({
            entry: [require.resolve('./dist/entry-js/polyfill.js'), './index.js'],
            output: {
                filename: 'index.js',
                library: 'RGUI2',
                libraryTarget: 'umd'
            }
        })))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('dist-css', (done) => {
    return gulp.src('./index.mcss')
        .pipe(mcss({
            pathes: [__dirname + '/../node_modules/mass', './node_modules'],
            importCSS: true
        }))
})

gulp.task('dist-build', ['dist-js', 'dist-css']);

'use strict';

const gulp = require('gulp');
const sequence = require('run-sequence');
const rm = require('gulp-rimraf');

const build = require('./gulp-build.js');

/**
 * Doc clean
 */
gulp.task('docs-clean', (done) => {
    return gulp.src('./docs', { read: false }).pipe(rm());
});

/**
 * Doc clean
 */
gulp.task('docs-copy', (done) => {
    return gulp.src('./assets/**').pipe(gulp.dest('./docs'));
});

/**
 * Doc build
 */
gulp.task('docs-build', (done) => {
    return gulp.src('./src/**/demo/*.md')
        .pipe(build())
        .pipe(gulp.dest('./docs'));
});
gulp.task('docs-watch', ['docs-build'], (done) => gulp.watch('./src/**/demo/*.md', ['docs-build']));

/**
 * Doc
 */
gulp.task('docs', (done) => {
    sequence(['docs-clean', 'cache-clean'], ['docs-copy'], [settings.watch ? 'docs-watch' : 'docs-build', 'cache'], done);
});

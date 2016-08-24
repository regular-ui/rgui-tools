'use strict';

const gulp = require('gulp');
const sequence = require('run-sequence');
const rm = require('gulp-rimraf');

const build = require('./gulp-build.js');

/**
 * Doc clean
 */
gulp.task('doc-clean', (done) => {
    return gulp.src('./doc', { read: false }).pipe(rm());
});

/**
 * Doc build
 */
gulp.task('doc-build', (done) => {
    return gulp.src('*/demo/*.md')
        .pipe(build())
        .pipe(gulp.dest('./doc'));
});
gulp.task('doc-watch', ['doc-build'], (done) => gulp.watch('*/demo/*.md', ['doc-build']));

/**
 * Doc
 */
gulp.task('doc', (done) => {
    sequence(['doc-clean', 'cache-clean'], [settings.watch ? 'doc-watch' : 'doc-build', 'cache'], done);
});

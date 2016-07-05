'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const program = gulp.program || {};

const eslint = require('gulp-eslint');
const eslintConfig = require('../../.eslintrc.js');
if(program.fix)
    eslintConfig.fix = true;

const SRC_PATHES = ['*.js', '*/*.js', '!node_modules/**', '!doc/**', '!dist/**', '!test-reports/**'];

gulp.task('lint', (done) => {
    return gulp.src(SRC_PATHES)
        .pipe(eslint(eslintConfig))
        .pipe(eslint.format())
        .pipe(gulpIf((file) => file.eslint !== null && file.eslint.fixed, gulp.dest('.')))
        .pipe(eslint.failAfterError());
});

gulp.task('lint-watch', ['lint'], (done) => {
    gulp.watch(SRC_PATHES, ['lint']);
});

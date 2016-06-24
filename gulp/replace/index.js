'use strict';

let gulp = require('gulp');
let all = require('gulp-all');

let replace = require('./gulp-replace');

gulp.task('replace', (done) => {
    return gulp.src('./**')
        .pipe(replace(gulp.components[0]))
        .pipe(gulp.dest('.'));
});

module.exports = gulp;

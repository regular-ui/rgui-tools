'use strict';

const gulp = require('gulp');
const all = require('gulp-all');

const replace = require('gulp-replace');

gulp.task('replace', (done) => {
    const component = settings.components[0];

    return gulp.src('./**')
        .pipe(replace(/Sample/g, component.name))
        .pipe(replace(/sample/g, component.lowerName))
        .pipe(gulp.dest('.'));
});

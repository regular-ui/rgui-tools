'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');

const eslint = require('gulp-eslint');
const eslintConfig = require('eslint-config-rgui');

eslintConfig.envs = [];
for (let key in eslintConfig.env)
    eslintConfig.envs.push(key);
eslintConfig.envs.push('mocha');
eslintConfig.globals = [];
eslintConfig.globals.push('expect');

if (settings.fix)
    eslintConfig.fix = true;

const SRC_PATHES = ['*.js', './src/**/*.js'];
const TEST_PATHES = ['./src/**/test/*.js'];
/**
 * Lint Run
 */
gulp.task('lint-run', (done) => {
    let stream = gulp.src(SRC_PATHES)
        .pipe(eslint(eslintConfig))
        .pipe(eslint.format());

    if (settings.fix)
        stream = stream.pipe(gulpIf((file) => file.eslint !== null && file.eslint.fixed, gulp.dest('.')));

    if (!settings.watch)
        stream = stream.pipe(eslint.failAfterError());

    return stream;
});
gulp.task('lint-watch', ['lint-run'], (done) => gulp.watch(SRC_PATHES, ['lint-run']));

/**
 * Lint
 */
gulp.task('lint', [settings.watch ? 'lint-watch' : 'lint-run']);

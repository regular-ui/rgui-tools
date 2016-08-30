'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');

const eslint = require('gulp-eslint');
const eslintConfig = require('eslint-config-rgui');

eslintConfig.envs = [];
for (let key in eslintConfig.env)
    eslintConfig.envs.push(key);

if (settings.fix)
    eslintConfig.fix = true;

// if(settings.tests) {
//     eslintConfig.envs.push('mocha');
//     eslintConfig.globals.push('expect');
// }

const SRC_PATHES = ['*.js', '*/*.js', '!./node_modules/**', '!./doc/**', '!./dist/**', '!./test-reports/**'];
const TEST_PATHES = ['*/test/*.js', '!./node_modules/**', '!./doc/**', '!./dist/**', '!./test-reports/**'];
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


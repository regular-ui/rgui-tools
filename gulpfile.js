'use strict';

const gulp = require('gulp');
const sequence = require('run-sequence');
const ghpages = require('gh-pages');

require('./gulp/cache');
require('./gulp/docs');
require('./gulp/lint');

gulp.task('dev', ['docs', 'lint']);
gulp.task('clean', ['docs-clean', 'cache-clean', 'dist-clean', 'test-clean']);

gulp.task('gh-pages', ['docs'], (done) => {
    ghpages.clean();
    ghpages.publish('docs', {
        src: ['**/*', '!**/__*'],
    }, (err) => {
        if (err)
            console.error(err);
        else
            console.log('gh-pages have been pushed.');
        done();
    });
});

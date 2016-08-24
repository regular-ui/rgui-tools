'use strict';

const gulp = require('gulp');
const sequence = require('run-sequence');
const ghpages = require('gh-pages');

require('./gulp/cache');
require('./gulp/doc');
require('./gulp/lint');

gulp.task('dev', ['doc', 'lint']);

gulp.task('gh-pages', ['doc'], (done) => {
    ghpages.clean();
    ghpages.publish('doc', {
        src: ['**/*', '!**/__*']
    }, function(err) {
        if(err)
            console.error(err);
        else
            console.log('gh-pages have been pushed.');
        done();
    });
});

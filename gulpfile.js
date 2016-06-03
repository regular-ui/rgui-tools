'use strict';

let gulp = require('gulp');
let sequence = require('run-sequence');
let ghpages = require('gh-pages');

require('./gulp/doc.js');
require('./gulp/cache.js');
require('./gulp/dist.js');

gulp.task('watch', ['doc-watch', 'cache-watch']);

gulp.task('doc', (done) => {
    sequence(['cache-clean', 'doc-clean'], ['doc-build', 'cache-build'], done);
});

gulp.task('dist', (done) => {
    sequence('dist-clean', 'dist-build', done);
});

gulp.task('gh-pages', (done) => {
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

module.exports = gulp;

'use strict';

let babelConfig = require('./babelrc.js');


let filePath = process.cwd() + '/.rgui-cache/test/index.js';
let reportsPath = process.cwd() + '/test-reports';

let preprocessors = {};
preprocessors[filePath] = 'webpack';
let webpackConfig = {
    output: {
        libraryTarget: 'umd'
    },
    externals: {
        'regularjs': {
            root: 'Regular',
            amd: 'Regular',
            commonjs: 'regularjs',
            commonjs2: 'regularjs'
        }
    },
    babel: babelConfig,
    module: {
        loaders: [
            { test: /\.rgl$/, loader: require.resolve('rgl-loader') },
            { test: /\.js$/, exclude: /node_modules\/(?!rgui-)/, loader: require.resolve('babel-loader') },
            { test: /\.js$/, exclude: /(test|node_modules)\//, loader: require.resolve('isparta-loader') }
        ]
    }
};

module.exports = function(config) {
    config.set({
        browsers: [
            'PhantomJS'
            // 'Chrome'
            // 'Firefox',
            //'IE', 'IE9', 'IE8', 'IE7',
        ],
        frameworks: ['mocha', 'expect'],
        files: [
            './node_modules/regularjs/dist/regular.min.js',
            './gulp/dist/entry-js/polyfill.js',
            filePath
        ],
        preprocessors: preprocessors,
        webpack: webpackConfig,
        webpackMiddleware: {noInfo: true},
        reporters: ['nyan', 'coverage'],
        coverageReporter: {
            dir: reportsPath,
            type: 'html'
        }
    });
};

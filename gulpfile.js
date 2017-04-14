var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var gutil = require('gulp-util');

require('es6-promise').polyfill();

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

var env  = process.env.NODE_ENV || 'development';
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('client-watch', function() {
    try {
        webpackCompiler = webpack(webpackConfig);
    } catch (err) {
        console.log(err);
    }

    let devServer = new WebpackDevServer(webpackCompiler, webpackConfig.devServer);
    devServer.listen(3000, 'localhost', function (err, result) {
        if(err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        } else {
            console.log('webpack dev server listening at localhost:3000');
        }
    });
}); 

gulp.task('default', ['client-watch']);
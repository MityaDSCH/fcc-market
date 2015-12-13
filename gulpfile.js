'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var lint = require('gulp-eslint');

var config = {
  port: 8080,
  baseUrl: 'http://localhost',
  paths: {
    clientDist: './dist/client',
    html: './src/client/index.html',
    js: ['./src/client/**/*.jsx', './src/server/**/*.js'],
    mainJs: './src/client/main.jsx'
  }
}

//Start dev server
gulp.task('connect', function() {
  connect.server({
    root: ['dist/client'],
    port: config.port,
    base: config.baseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('./dist/client/index.html')
    .pipe(open({
      uri: config.baseUrl + ':' + config.port + '/'
    }));
});

gulp.task('html', function() {
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.clientDist))
      .pipe(connect.reload());
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.clientDist + '/scripts'))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(lint({config: './eslint.config.json'}))
    .pipe(lint.format());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'lint', 'js', 'open', 'watch']);

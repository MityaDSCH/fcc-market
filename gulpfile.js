'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var scssLint = require('gulp-scss-lint');
var lint = require('gulp-eslint');

var config = {
  port: 8080,
  baseUrl: 'http://localhost',
  paths: {
    clientDist: './dist/client',
    html: './src/client/index.html',
    js: ['./src/client/**/*.jsx', './src/server/**/*.js'],
    scss: './src/client/**/*.scss',
    mainJs: './src/client/main.jsx',
    scssLintConfig: './scss-lint.yml'
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

gulp.task('scss-lint', function() {
  return gulp.src(config.paths.scss)
    .pipe(scssLint({
      'config': config.paths.scssLintConfig,
    }));
});

gulp.task('sass', function() {
  gulp.src(config.paths.scss)
    .pipe(concat('bundle.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(config.paths.clientDist + '/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.scss, ['sass', 'scss-lint']);
});

gulp.task('default', ['html', 'lint', 'js', 'scss-lint', 'sass', 'open', 'watch']);

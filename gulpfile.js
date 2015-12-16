'use strict';

var gulp = require('gulp');
var open = require('gulp-open');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var scssLint = require('gulp-scss-lint');
var lint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');

var config = {
  port: 8080,
  baseUrl: 'http://localhost',
  paths: {
    clientDist: './dist/client',
    serverDist: './dist/server',
    html: './src/client/index.html',
    js: './src/client/**/*.jsx',
    scss: './src/client/**/*.scss',
    imagesSrc: './src/client/images/**/*',
    imagesDist: './dist/client/images',
    mainJs: './src/client/main.jsx',
    scssLintConfig: './scss-lint.yml',
    server: './src/server/**/*',
    package: './package.json',
    dist: './dist'
  }
}

gulp.task('html', function() {
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.clientDist));
});

gulp.task('client-js', function() {
  watchify(browserify(config.paths.mainJs))
    .transform('babelify', {presets: ['es2015', 'react']})
    .on('error', console.log)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.clientDist + '/scripts'));
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
    .pipe(gulp.dest(config.paths.clientDist + '/css'));
});

gulp.task('copy-server', function() {
  gulp.src(config.paths.server)
    .pipe(gulp.dest(config.paths.serverDist));
  gulp.src(config.paths.package)
    .pipe(gulp.dest(config.paths.dist))
});

gulp.task('copy-images', function() {
  gulp.src(config.paths.imagesSrc)
    .pipe(gulp.dest(config.paths.imagesDist));
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['client-js', 'lint']);
  gulp.watch(config.paths.scss, ['sass', 'scss-lint']);
});

gulp.task('start', ['build', 'watch'], function () {
  nodemon({
    script: config.paths.serverDist + '/main.js',
    ext: 'html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('open', ['start'], function() {
  gulp.src('./dist/client/index.html')
    .pipe(open({
      uri: config.baseUrl + ':' + config.port + '/'
    }));
});

gulp.task('serve', ['open']);

gulp.task('build', ['html', 'lint', 'client-js', 'scss-lint', 'sass', 'copy-server', 'copy-images']);

gulp.task('deploy', ['build'], shell.task([
  'git subtree push --prefix dist heroku master'
]));

var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var bundler = require('aurelia-bundler');
var notify = require("gulp-notify");

var config = {
  force: true,
  packagePath: '.',
  bundles: {
    "bin/dist/app-build": {
      includes: [
        '*',
        '*.html!text',
        '*.css!text',
        'bootstrap/css/bootstrap.css!text'
      ],
      options: {
        inject: true
      }
    },
    "bin/dist/aurelia": {
      includes: [
        'aurelia-bootstrapper',
        'aurelia-fetch-client',
        'aurelia-router',
        'aurelia-animator-css',
        'github:aurelia/templating-binding',
        'github:aurelia/templating-resources',
        'github:aurelia/templating-router',
        'github:aurelia/loader-default',
        'github:aurelia/history-browser',
        'github:aurelia/logging-console'
      ],
      options: {
        inject: true
      }
    }
  }
};
// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

//bundles aurelia files into single js file
gulp.task('bundle-aurelia', function() {
  return bundler.bundle(config);
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// copies index.html in bin direcotry
gulp.task('build-index', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('bin/'));
});

// copies config.js in bin direcotry
gulp.task('build-config', function() {
  gulp.src('config.js')
    .pipe(gulp.dest('bin/'));
});

// copies system.js in bin direcotry
gulp.task('build-systemjs', function() {
  gulp.src('jspm_packages/system.js')
    .pipe(gulp.dest('bin/'));
});

// copies fonts in bin direcotry
gulp.task('build-fonts', function() {
  gulp.src('src/app/fonts/*')
    .pipe(gulp.dest('bin/fonts'));
});

// copies changed css files to the output directory
gulp.task('build-css', function () {
  return gulp.src(paths.css)
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
//TODO add lint and tests to run every time you build
gulp.task('build',function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-systemjs', 'build-index','build-config', 'build-fonts', 'build-css', 'bundle-aurelia'],
    callback
  );
});

var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');

gulp.task('default', ['copy-index-html', 'build-less']);

//1. Copy index.html from src to bin
gulp.task('copy-html', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('bin/'));
});

gulp.task('copy-files', function() {
  gulp.src('src/assets/images/**/*')
    .pipe(gulp.dest('bin/assets/images'));
});

//2. Compile main.less in bin/css
gulp.task('build-less', function(){
  return gulp.src('src/assets/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('bin/css/'));
});

//3. React to changes in files via watch
gulp.task('watch', function () {
  gulp.watch('src/**/*.less', ['build-less', 'copy-files']);
  gulp.watch('src/**/*.html', ['copy-html', 'copy-files']);
});
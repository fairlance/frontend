var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var concat = require('gulp-concat');

gulp.task('default', ['copy-html', 'build-less', 'copy-files', 'concat-js']);
gulp.task('deploy', ['copy-html', 'build-less', 'copy-files', 'concat-js', 'prepare-deploy']);

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

//3. Concat js files
gulp.task('concat-js', function () {
  gulp.src(['vendor/jquery/dist/jquery.min.js', 'src/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('bin/js/'));
});

//4. Concat js files
gulp.task('prepare-deploy', function () {
  gulp.src('appspec.yml')
    .pipe(gulp.dest('bin/'));
});

//5. React to changes in files via watch
gulp.task('watch', function () {
  gulp.watch('src/**/*.less', ['build-less']);
  gulp.watch('src/**/*.html', ['copy-html']);
  gulp.watch('src/**/*.js', ['concat-js']);
});


var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('default', ['copy-index-html', 'build-less']);

//1. Copy index.html from src to bin
gulp.task('copy-index-html', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('bin/'));
});

//2. Compile main.less in bin/css
gulp.task('build-less', function(){
  return gulp.src('src/assets/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('bin/css/'));
});


//3. React to changes in files via watch
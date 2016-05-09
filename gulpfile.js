var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('watch', function() {
  gulp.watch(['gulpfile.js', 'test/*.js', 'backbone.multi-extend.js'], ['test']);
});

gulp.task('test', function(done) {
  return gulp.src(['test/*.js'], {
      read: false
    })
    .pipe(mocha({
      reporter: 'list'
    }));
  // .on('error', gutil.log);
  // .on('error', function(error) {
  //   gutil.log('------------------');
  //   gutil.log(arguments);
  //   gutil.log('------------------');
  //   done('test failed');
  // });
  // .on('end', done);
});

gulp.task('build', ['test'], function() {
  return gulp.src('backbone.multi-extend.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(__dirname));
});

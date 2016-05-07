var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');

gulp.task('watch', function() {
  gulp.watch(['test/*.js', 'backbone.multi-extend.js'], ['test']);
});

gulp.task('test', function() {
  return gulp.src(['test/*.js'], {
      read: false
    })
    // .pipe(gutil.log)
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('error', gutil.log);
});

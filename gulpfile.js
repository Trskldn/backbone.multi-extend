var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bump = require('gulp-bump');
var git = require('gulp-git');
var fs = require('fs');
var runSequence = require('run-sequence');

gulp.task('watch', function() {
  gulp.watch(['gulpfile.js', 'test/*.js', 'backbone.multi-extend.js'], ['test']);
});

gulp.task('test', function() {
  return gulp.src(['test/*.js'], {
      read: false
    })
    .pipe(mocha({
      require: ['./test_helper.js'],
      reporter: 'list'
    }))
    .on('error', gutil.log);

});

gulp.task('build', ['test'], function() {
  return gulp.src('backbone.multi-extend.js')
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(__dirname));
});


gulp.task('bump-version', function() {
  // We hardcode the version change type to 'patch' but it may be a good idea to
  // use minimist (https://www.npmjs.com/package/minimist) to determine with a
  // command argument whether you are doing a 'major', 'minor' or a 'patch' change.
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({
      type: "patch"
    }).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function() {
  return gulp.src('.')
    .pipe(git.add())
    .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', function(cb) {
  git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', function(cb) {
  var version = getPackageJsonVersion();
  git.tag(version, 'Created Tag for version: ' + version, function(error) {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', {
      args: '--tags'
    }, cb);
  });

  function getPackageJsonVersion() {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  }
});

gulp.task('release', ['build'], function(cb) {
  runSequence(
    'bump-version',
    'commit-changes',
    'push-changes',
    'create-new-tag',
    function(error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      cb(error);
    });

});
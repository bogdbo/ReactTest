var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  browserify({
    entries: './src/js/main.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('default',['browserify', 'copy']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});

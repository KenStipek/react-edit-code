var gulp    = require('gulp'),
  connect   = require('gulp-connect'),
  react     = require('gulp-react');

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('react', function () {
  gulp.src('template.jsx')
    .pipe(react())
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch', 'react']);

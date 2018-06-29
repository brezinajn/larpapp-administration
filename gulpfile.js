'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var bulkSass = require('gulp-sass-bulk-import');

//default task
gulp.task("default", ["sass:watch"]);
// gulp.task("default", ["sass:watch"]);

//build css
gulp.task('build-css', function () {
  return gulp.src('./sass/App.scss')
    .pipe(bulkSass())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/'));
});

//watch changes in sass
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['build-css']);
});

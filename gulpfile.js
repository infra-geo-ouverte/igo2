/*jshint esversion: 6 */
const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('geo:fixOL', () => {
  gulp
    .src(['./node_modules/ol/proj.js'])
    .pipe(replace('@typedef {module:ol/proj/Projection', '@typedef {'))
    .pipe(gulp.dest('./node_modules/ol/'));
});

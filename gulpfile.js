/*jshint esversion: 6 */
const gulp = require('gulp');
const jeditor = require('gulp-json-editor');


gulp.task('geo:fixOL', done => {
  gulp
    .src(['./node_modules/ol/package.json'])
    .pipe(
      jeditor({
        sideEffects: true
      })
    )
    .pipe(gulp.dest('./node_modules/ol/'));

  done();
});

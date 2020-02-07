/*jshint esversion: 6 */
const gulp = require('gulp');
const jeditor = require('gulp-json-editor');
const babel = require('gulp-babel');

gulp.task( 'default', [ 'geo:fixOL', 'geo:fixMapbox' ] );

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

gulp.task('geo:fixMapbox', done => {
  gulp
    .src(
      [
        './node_modules/@mapbox/mapbox-gl-style-spec/deref.js',
        './node_modules/ol-mapbox-style/stylefunction.js'
      ],
      { base: './' }
    )
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(gulp.dest('.'));

  done();
});

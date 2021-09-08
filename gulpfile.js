/*jshint esversion: 6 */
const gulp = require('gulp');
const jeditor = require('gulp-json-editor');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const concat = require('gulp-concat');

gulp.task('concatStyles', done => {
  gulp
    .src([
      './node_modules/@igo2/core/style/index.theming.scss',
      './src/style/reset.scss',
      './src/app/app.theming.scss',
      './src/app/pages/portal/portal.theming.scss',
      './src/app/pages/portal/sidenav/sidenav.theming.scss',
      './src/app/pages/portal/welcome-window/welcome-window.theming.scss'
    ])
    .pipe(concat('theme.scss'))
    .pipe(gulp.dest('./src/style', { overwrite: true }));

  done();
});

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

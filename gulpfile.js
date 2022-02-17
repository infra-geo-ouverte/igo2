/*jshint esversion: 6 */
const gulp = require('gulp');
const bump = require('gulp-bump');
const package = require('./package.json')

gulp.task('bumpPwaVersionDev', done => {
  gulp.src(['./ngsw-config.json'])
    .pipe(bump({ type: 'prerelease' }))
    .pipe(gulp.dest('./'));
  done();
});

gulp.task('bumpPwaVersionProd', done => {
  const packageVersion = package.version;
  gulp.src(['./ngsw-config.json'])
    .pipe(bump({ version: packageVersion+'-pwa' }))
    .pipe(gulp.dest('./'));
  done();
});

/*jshint esversion: 6 */
const gulp = require('gulp');

gulp.task('copyLocaleFromLib', done => {
  gulp
    .src('./node_modules/@igo2/core/locale/@(fr|en).json', { "allowEmpty": true })
    .pipe(gulp.dest('./src/locale/libs_locale'));
  done();
});


gulp.task('watch:locale', function () {
  gulp.watch('./node_modules/@igo2/core/locale/*.json', gulp.series('copyLocaleFromLib'));
});


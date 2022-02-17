/*jshint esversion: 6 */
const gulp = require('gulp');
const bump = require('gulp-bump');

gulp.task('bumpPwaVersion', function(){

    gulp.src(['./ngsw-config.json'])
    .pipe(bump({type:'prerelease'}))
    .pipe(gulp.dest('./'));
  });



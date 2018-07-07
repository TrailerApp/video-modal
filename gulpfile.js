const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del')
const gutil = require('gulp-util');
const open = require('gulp-open');
const uglify = require('gulp-uglify');

gulp.task('clean', function() {
  return del(['dist/*']) 
})

gulp.task('css', function () {
  return gulp.src('./src/*.css')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('js', function () {
  return gulp.src('./src/*.js')
  	.pipe(concat('video-modal.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('minify', ['css','js'], function() {
  return gulp.src(["./dist/video-modal.js"])
    .pipe(concat("video-modal.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/"))
})

gulp.task("build", ["clean"], function() {
	gulp.start(['minify'])
});
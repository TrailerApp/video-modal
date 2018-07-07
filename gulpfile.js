const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del')
const gutil = require('gulp-util');
const open = require('gulp-open');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('clean', function () {
  return del(['dist/*'])
})

gulp.task('css', function () {
  return gulp.src('./src/*.css')
    .pipe(gulp.dest('./dist/'))
})

gulp.task('minifycss', function () {
  return gulp.src('./src/*.css')
    .pipe(concat('video-modal.min.css'))
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('./dist/'))
});

gulp.task('js', function () {
  return gulp.src('./src/*.js')
    .pipe(concat('video-modal.js'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('minifyjs', ['css', 'js'], function () {
  return gulp.src(["./dist/video-modal.js"])
    .pipe(concat("video-modal.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/"))
})

gulp.task('build', ['clean'], function () {
  gulp.start(['minifyjs', 'minifycss'])
});
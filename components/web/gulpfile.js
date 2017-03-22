const gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested');

gulp.task('styles', function() {
  return gulp.src('./themes/codeforsf/public/css/**/*.css')
    .pipe(postcss([cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./themes/codeforsf/temp/styles'));
})


gulp.task('watch', function() {
  watch('./themes/codeforsf/public/css/**/*.css', function() {
    gulp.start('styles');
  })

})

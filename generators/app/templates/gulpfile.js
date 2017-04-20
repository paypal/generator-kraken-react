var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var webpack = require('webpack');

gulp.task('babelify-server', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe($.babel({
      presets: ['es2015', 'stage-3']
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('babelify-client', function() {
  return gulp.src('./public/**/*.js')
   .pipe($.babel({
       presets: ['es2015', 'react', 'stage-3']
   }))
   .pipe($.revertPath())
   .pipe(gulp.dest('./build'));
})


gulp.task('webpackify-client', function() {
   webpack(require('./webpack.config.js'), function() {
    
   })
});


gulp.task('watch', function() {
    gulp.watch('./src/**', ['babelify-server']);
    gulp.watch('./public/**/*.js', ['babelify-client', 'webpackify-client']);
});


var filesToLint = [

];

gulp.task('lint', function() {
  return gulp.src(filesToLint)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});


gulp.task('build', ['babelify-server', 'babelify-client', 'webpackify-client']);
gulp.task('heroku_build', ['babelify-server', 'babelify-client']);

gulp.task('dev', ['build', 'watch'], function () {
  $.nodemon({
    script: './index.js',
    watch: ['./index.js', './src', './public/routes', './public/store', './config']
  });
});

gulp.task('default', ['dev']);

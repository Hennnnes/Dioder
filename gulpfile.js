'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer')

// variables
// set prefix options
var prefixOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// set private folder path
var privateFolder = './Private';
var publicFolder = './Public';



// watch SASS for changes
gulp.task('watch:sass', function() {
    // watch private folder for changes
    return gulp.watch(privateFolder + '/**/*.scss', ['sass'])
});


gulp.task('sass', function() {
  return gulp
      .src(privateFolder + '/Styles/style.scss')
      .pipe(sass().on('error', function(error){
          notify({title: 'Sass Error'}).write('Line: ' + error.line);
          console.log(error.messageFormatted);
      }))
      .pipe(autoprefixer(prefixOptions))
      .pipe(gulp.dest(publicFolder + '/Styles/'));
});

gulp.task('default', ['sass', 'watch:sass' ]);

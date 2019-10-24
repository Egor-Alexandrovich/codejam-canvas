const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourceMaps = require('gulp-sourcemaps');
const del = require("del");

gulp.task('sass', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(plumber())
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
  });

  gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
  });
  gulp.task('js', function () {
    return gulp.src('src/*.js')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
  });
  
  gulp.task('allimg', function () {
    return gulp.src('src/assets/images/**/*.{png,jpg,svg}')
        .pipe(gulp.dest('dist/assets/images'))
        .pipe(browserSync.reload({stream: true}));
  });
  gulp.task('fonts', function () {
    return gulp.src('src/assets/fonts/**/*.*')
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(browserSync.reload({stream: true}));
  });
  gulp.task('serve', gulp.series ('sass', 'html', 'js', 'allimg', 'fonts', function () {
    browserSync.init({
      server: "dist"
    });
    gulp.watch("src/scss/**/*.scss", gulp.series ('sass'));
    gulp.watch("src/*.html", gulp.series ('html'));
    gulp.watch("src/*.js", gulp.series ('js'));
    gulp.watch("src/assets/images/**/*.{png,jpg,svg}", gulp.series ('allimg'));
    gulp.watch("src/assets/fonts/**/*.*", gulp.series ('fonts'));
  }));

  gulp.task('copyAssets', function () {
    return gulp.src('src/assets/**',)
        .pipe(gulp.dest('dist/assets'))
  });
  gulp.task('copyData', function () {
    return gulp.src('src/data/**',)
        .pipe(gulp.dest('dist/data'))
  });
  gulp.task('copyHtml', function () {
    return gulp.src('src/*.html',)
        .pipe(gulp.dest('dist'))
  });
  gulp.task('copyFavicon', function () {
    return gulp.src('src/*.ico',)
        .pipe(gulp.dest('dist'))
  });
  gulp.task('copyJs', function () {
    return gulp.src('src/*.js',)
        .pipe(gulp.dest('dist'))
  });

  gulp.task('clean', function () {
    return del('dist/**');
  });
  
  gulp.task('build',
  gulp.series('clean',
    gulp.parallel(
      'copyAssets',
      'copyData',
      'copyHtml',
      'copyFavicon',
      'copyJs',
      'sass'
    )
  )
);
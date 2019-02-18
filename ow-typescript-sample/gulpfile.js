var gulp = require("gulp");
var browserify = require("browserify");
var ts = require("gulp-typescript");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var paths = {
  pages: ['src/**/*.html'],
  css: ['src/css/*.css'],
  assets: ['desktop-icon.ico', 'IconMouseNormal.png', 'IconMouseOver.png', 'manifest.json']
};

var tsProject = ts.createProject("tsconfig.json");

gulp.task("copy-html", function () {
  return gulp.src(paths.pages)
    .pipe(gulp.dest("dist"));
});

gulp.task("copy-css", function () {
  return gulp.src(paths.css)
    .pipe(gulp.dest("dist"));
});

gulp.task("copy-assets", function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.series("copy-html", "copy-css", "copy-assets", function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: [
      'src/main.ts'
    ],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("dist"));
  // return tsProject.src()
  //   .pipe(tsProject())
  //   .js.pipe(gulp.dest("dist"));
}));
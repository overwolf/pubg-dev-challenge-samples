var gulp = require("gulp");
var watch = require("gulp-watch");
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var browserify = require("browserify");
var tsify = require("tsify");

var paths = {
    pages: [
        'src/**/*.html'
    ],
    scss: [
        'src/scss/*.scss'
    ],
    assets: [
        'assets/**/*.*'
    ],
    typescript: [
        'src/**/*.ts'
    ]
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

gulp.task("copy-assets", function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest("dist"));
});

gulp.task('build-sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass({style: 'expanded'}))
        .pipe(gulp.dest('dist'));
});

gulp.task("build-typescript", function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
});


gulp.task("watch", function () {
    gulp.watch(paths.pages, gulp.series("copy-html"));
    gulp.watch(paths.scss, gulp.series("build-sass"));
    gulp.watch(paths.assets, gulp.series("copy-assets"));
    gulp.watch(paths.typescript, gulp.series("build-typescript"));
});

gulp.task("default", gulp.series("copy-html", "build-sass", "copy-assets", "build-typescript", "watch"));
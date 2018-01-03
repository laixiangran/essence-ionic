/**
 * Created by laixiangran on 2017/5/7.
 * homepage：http://www.laixiangran.cn
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var inlineNg2Template = require('gulp-inline-ng2-template');
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');

var config = {
    src: './src/app/components',
    dest: './dist',
    aot: './aot'
};

var components = [
    'essence-ion-amap',
    'essence-ion-calendar',
    'essence-ion-videoplayer'
];

gulp.task('clean:dist', function () {
    return del.sync(config.dest, config.aot);
});

gulp.task('copy:src', ['clean:dist'], function () {
    return gulp.src([config.src + '/**/*.*'])
        .pipe(gulpif(/.+\.scss/g, sass({outputStyle: 'compressed'}).on('error', sass.logError)))
        .pipe(rename(function (path) {
            if (path.extname === '.css') {
                path.extname = '.scss';
            }
        }))
        .pipe(gulp.dest(config.aot));
});

gulp.task('ng2:inline', ['copy:src'], function () {
    return gulp.src([config.aot + '/**/*.ts'])
        .pipe(inlineNg2Template({useRelativePaths: true, target: 'es5'}))
        .pipe(gulp.dest(config.aot + '/'));
});

gulp.task('prepublish', function (cb) {
    runSequence(['clean:dist', 'copy:src', 'addStyleUrls', 'ng2:inline'], cb);
});

gulp.task('delStyleUrls', function () {
    components.forEach(function (c) {
        var src = config.src + '/' + c + '/',
            cUrl = src + c + '.component.ts',
            styleText = 'styleUrls: [\'\./' + c + '.component.scss\'],',
            styleText2 = 'styleUrls: [\'\./' + c + '.component.scss\']';
        gulp.src([cUrl])
            .pipe(replace(styleText, ''))
            .pipe(replace(styleText2, ''))
            .pipe(gulp.dest(src));
    });
});

gulp.task('addStyleUrls', function () {
    components.forEach(function (c) {
        var src = config.aot + '/' + c + '/',
            cUrl = src + c + '.component.ts',
            styleText = 'templateUrl: \'\./' + c + '.component.html\'',
            styleText2 = 'styleUrls: [\'\./' + c + '.component.scss\']';
        gulp.src([cUrl])
            .pipe(replace(styleText, styleText2 + ',' + styleText))
            .pipe(gulp.dest(src));
    });
});

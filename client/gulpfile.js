var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();

var dest = __dirname + "/dist"


gulp.task('js', function () {
    return gulp.src('./src/js/main.js')
        .pipe(webpack({
            entry: './src/js/main.js',
            output: {
                path: dest,
                filename: 'main.bundle.js'
            },
        }))
        .pipe(gulp.dest('dist/'));
});
gulp.task('swjs', function () {
    return gulp.src('./src/js/sw.js')
        .pipe(webpack({
            entry: './src/js/sw.js',
            output: {
                path: dest,
                filename: 'sw.js'
            },
        }))
        .pipe(gulp.dest('dist/')); 
});
gulp.task('getCss', function () {
    return gulp.src(['./src/css/**/*', './node_modules/materialize-css/dist/css/materialize.min.css'])
        .pipe(gulp.dest(dest + '/css'))
})

gulp.task('getfonts', function () {
    return gulp.src(['./src/fonts/**/*'])
        .pipe(gulp.dest(dest + '/fonts'));
})

gulp.task('getImages', function () {
    return gulp.src(['./src/images/**/*'])
        .pipe(gulp.dest(dest + '/images'));
})

gulp.task('getFiles', function () {
    return gulp.src(['./src/index.html', './src/manifest.json', './src/favicon.ico'])
        .pipe(gulp.dest(dest));
})

gulp.task('build', ['js', 'swjs', 'getCss', 'getfonts', 'getImages', 'getFiles']);


gulp.task('watch', function () {
    gulp.watch('./src/css/**/*', ['getCss']);
    gulp.watch('./src/js/**/*', ['webpack']);
   
});

gulp.task('browsersync', function () {
    browserSync.init({
        server: {
            baseDir: dest
        }
    });
})

gulp.task('publish', ['build'], function () {

    // create a new publisher using S3 options
    var publisher = awspublish.create({
        region: 'eu-west-1',
        params: {
            Bucket: 'progressivestore'
        }
    });

    // define custom headers
    var headers = {};
    return gulp.src([dest + '/**/*'])
        // gzip, Set Content-Encoding headers and add .gz extension
        //.pipe(awspublish.gzip({ ext: '.gz' }))

        // publisher will add Content-Length, Content-Type and headers specified above
        // If not specified it will set x-amz-acl to public-read by default
        .pipe(publisher.publish(headers))

        // create a cache file to speed up consecutive uploads
        //.pipe(publisher.cache())

        // print upload updates to console
        .pipe(awspublish.reporter());
});

gulp.task('dev', ['build', 'watch', 'browsersync']);
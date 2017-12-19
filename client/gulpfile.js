var gulp = require('gulp');
var dest = require('gulp-dest');
var awspublish = require('gulp-awspublish');

gulp.task('getCss', function(){
    gulp.src(['**/css/**/*', '!./node_modules/**'])
        .pipe(dest('all', { basename : 'all'}))
        .pipe(gulp.dest('./'))
        .pipe(awspublish.reporter());
})

gulp.task('getDist', function () {
    gulp.src(['./dist/**/*', '!./node_modules/**'])
        .pipe(dest('all'))
        .pipe(gulp.dest('./'))
})

gulp.task('getfonts', function () {
    gulp.src(['./fonts/**/*', '!./node_modules/**']).pipe(gulp.dest('all/'));
})

gulp.task('getImages', function () {
    gulp.src(['./images/**/*', '!./node_modules/**']).pipe(gulp.dest('all/'));
})

gulp.task('getFiles', function () {
    gulp.src(['./index.html', './sw.js' , './manifest.json', '!./node_modules/**']).pipe(gulp.dest('all/'));
})


gulp.task('publish', ['getCss', 'getDist', 'getfonts', 'getImages', 'getFiles'], function () {

    // create a new publisher using S3 options
    var publisher = awspublish.create({
        region: 'eu-west-1',
        params: {
            Bucket: 'progressivestore'
        }
    });

    // define custom headers
    var headers = {};

    return gulp.src(['./all/**/*'])//,'./dist/*', './fonts/*', './images/*', './html.js','./sw.js', './manifest.json'])
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
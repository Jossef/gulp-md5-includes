var gulp = require('gulp');
var md5Includes = require('../index');

gulp.task('md5', function () {
    gulp.src("./index.tpl.html")
        .pipe(md5Includes(['assets/style.css', 'assets/scripts.js'], 'index.html'))
        .pipe(gulp.dest("./dist"));
});


gulp.task('md5-advanced', function () {
    gulp.src("./index.tpl.html")
        .pipe(md5Includes([
                {
                    path: 'assets/style.css',
                    pattern: 'advanced/configuration/path/style.css'
                },
                {
                    path: 'assets/scripts.js',
                    pattern: 'advanced/configuration/path/scripts.js'
                }],
            'index-advanced.html'))
        .pipe(gulp.dest("./dist"));
});

gulp.task('default', ['md5', 'md5-advanced']);

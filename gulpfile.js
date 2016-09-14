var gulp        = require('gulp');
var stylus      = require('gulp-stylus');
var connect     = require('gulp-connect');
var jade        = require('gulp-jade');
var sourcemaps  = require('gulp-sourcemaps');
var svgSprite   = require('gulp-svg-sprite');
var jeet        = require('jeet');
var koutoSwiss  = require('kouto-swiss');
var rupture     = require('rupture');
var argv        = require('yargs').argv;
var ftp         = require('gulp-ftp');

function errorHandler( error ){

    console.log(error.toString());

    this.emit('end')

}

gulp.task('stylus', function(){
    gulp.src('./assets/stylus/*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [koutoSwiss(), jeet(), rupture()]
        }))
        .on('error', errorHandler)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css'))
        .pipe(connect.reload());
});

gulp.task('jade', function(){
    gulp.src('./templates/*.jade')
        .pipe(jade({
            pretty: true,
            locals: {
                prod: argv.prod
            }
        }))
        .on('error', errorHandler)
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('connect', function(){
    connect.server({
        port: 3000,
        livereload: true,
        root: './'
    });
});

gulp.task('watch', function(){
    gulp.watch('./assets/stylus/**/**.styl', ['stylus']);
    gulp.watch('./templates/**/*.jade', ['jade']);
});

gulp.task('default', ['stylus', 'jade', 'connect', 'watch']);

gulp.task('svg', function(){
    gulp.src('./assets/svg/*.svg')
        .pipe(svgSprite({
            mode                : {
                view            : {         // Activate the «view» mode
                    bust        : false,
                    render      : {
                        css    : true      // Activate Sass output (with default options)
                    }
                },
                symbol          : true      // Activate the «symbol» mode
            }
        }))
        .pipe(gulp.dest('./assets/svg/out'))
});

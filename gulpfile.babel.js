const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
// const svgstore = require('gulp-svgstore');
// // const svgmin = require('gulp-svgmin');
// const path = require('path');
 
// gulp.task('svgstore', () => {
// 	return gulp
// 		.src('./images/src/*.svg')
// 		.pipe(svgstore({
// 			inlineSvg: true,
// 			fileName: "sprite.svg",
// 			prefix: "icon-"
// 		}))
// 		.pipe(gulp.dest('./images/'));
// });

gulp.task('sass', () => {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({
		  browsers: ['last 2 versions'],
		  cascade: false
		}))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
});

gulp.task('default', ['browserSync', 'sass'], () => {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/images/**/*.svg', browserSync.reload);
});

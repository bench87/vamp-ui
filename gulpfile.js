const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('prepare', gulp.series('partials', gulp.parallel('styles', 'scripts'), 'inject'));
gulp.task('build', gulp.series( gulp.parallel('prepare', 'other', 'failAfterError'), 'build', fixDist));
gulp.task('test', gulp.series('scripts', 'karma:single-run'));
gulp.task('test:auto', gulp.series('watch', 'karma:auto-run'));
gulp.task('serve', gulp.series('prepare', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch([
    conf.path.src('index.html'),
    'bower.json'
  ], gulp.parallel('prepare'));

  gulp.watch(conf.path.src('**/*.html'), gulp.series('partials', reloadBrowserSync));
  gulp.watch([
    conf.path.src('**/*.scss'),
    `!${conf.path.src('styles/_icons.scss')}`,
    conf.path.src('**/*.css')
  ], gulp.series('styles'));
  gulp.watch(conf.path.src('**/*.js'), gulp.series('prepare'));
  done();
}

function fixDist(next) {
  /*gulp
    .src(conf.paths.dist + '/img/background-*.png')
    .pipe(gulp.dest(conf.paths.dist + '/styles/img'));

  gulp
    .src(conf.paths.dist + '/fonts/roboto-*')
    .pipe(gulp.dest(conf.paths.dist + '/styles/fonts'));*/

  gulp.src(conf.paths.dist + '/../bower_components/components-font-awesome/fonts/*')
    .pipe(gulp.dest(conf.paths.dist + '/fonts'));

  gulp.src(conf.paths.dist + '/../bower_components/simple-line-icons/fonts/*')
    .pipe(gulp.dest(conf.paths.dist + '/fonts'));

  next();
}

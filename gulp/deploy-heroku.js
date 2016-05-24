import childProcess from 'child_process';
import gulp from 'gulp';

gulp.task('deploy-heroku', ['deploy-heroku-git', 'deploy-firebase-database']);

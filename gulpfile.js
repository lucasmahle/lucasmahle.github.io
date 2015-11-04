var  gulp        = require('gulp')
	,plumber     = require('gulp-plumber')
	,browserSync = require('browser-sync')
	,cp          = require('child_process')
	;

var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
		.on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		},
		socket: {
			domain: 'http://localhost:3000'
		}
	});
});


/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch([
		'css/**/*.sass',
		'_config.yml', // vai acompanhar todos esse aqruivos
		'*.html',
		'index.html', 
		'_includes/*.html', 
		'_layouts/*.html', 
		'_posts/*'
	], ['jekyll-rebuild']); // e executar todas essas tarefas
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
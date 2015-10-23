var gulp        = require('gulp'),
	plumber     = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	cp          = require('child_process'),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	minifyCSS 	= require('gulp-minify-css'),
	less 		= require('gulp-less');

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
 * Fonts task
 */
gulp.task('fonts', function(){
		gulp.src('_src/less/fonts/*.*') // seleciona todas as pastas dentro de _src/js e todos arquivos .js
		.pipe(plumber()) // impede o fim da execução por erros
		.pipe(gulp.dest('_site/assets/css/fonts/')) // seleciona saida em tempo de execução
		.pipe(browserSync.reload({stream:true})) // atualiza página
		.pipe(gulp.dest('assets/css/fonts/')); // seleciona a saida em tempo de deploy
});

/**
 * Less task
 */
gulp.task('less', function(){
		gulp.src('_src/less/style.less') // seleciona todas as pastas dentro de _src/js e todos arquivos .js
		.pipe(plumber()) // impede o fim da execução por erros
		.pipe(less()) // compila less
		.pipe(minifyCSS()) // minifica arquivo
		.pipe(gulp.dest('_site/assets/css/')) // seleciona saida em tempo de execução
		.pipe(browserSync.reload({stream:true})) // atualiza página
		.pipe(gulp.dest('assets/css/')); // seleciona a saida em tempo de deploy

		gulp.src('_src/less/curriculo.less') // seleciona todas as pastas dentro de _src/js e todos arquivos .js
		.pipe(plumber()) // impede o fim da execução por erros
		.pipe(less()) // compila less
		.pipe(minifyCSS()) // minifica arquivo
		.pipe(gulp.dest('_site/assets/css/')) // seleciona saida em tempo de execução
		.pipe(gulp.dest('assets/css/')); // seleciona a saida em tempo de deploy
});

/**
 * Javascript Task
 */
gulp.task('js', function(){
	return gulp.src('_src/js/**/*.js') // seleciona todas as pastas dentro de _src/js e todos arquivos .js
		.pipe(plumber()) // impede o fim da execução por erros
		.pipe(concat('script.min.js')) // concatena arquivos e seta saída
		.pipe(uglify()) // minimica arquivos
		.pipe(gulp.dest('_site/assets/js/')) // seleciona saida em tempo de execução
		.pipe(browserSync.reload({stream:true})) // atualiza página
		.pipe(gulp.dest('assets/js/')); // seleciona a saida em tempo de deploy
});

/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch('_src/less/**/*.less', ['less']);
	gulp.watch('_src/js/**/*.js', ['js']);
	gulp.watch([
		'_config.yml', // vai acompanhar todos esse aqruivos
		'*.html',
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
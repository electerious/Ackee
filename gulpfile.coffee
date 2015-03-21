gulp			= require 'gulp'
sass			= require 'gulp-sass'
cssmin			= require 'gulp-cssmin'
minify			= require 'gulp-minify-css'
concat			= require 'gulp-concat'
coffee			= require 'gulp-coffee'
uglify			= require 'gulp-uglify'
header			= require 'gulp-header'
footer			= require 'gulp-footer'
filelog			= require 'gulp-filelog'
del				= require 'del'
autoprefixer	= require 'gulp-autoprefixer'
pkg				= require('./package.json')

###
# CSS Tasks
###
gulp.task 'css:compile', ->
	gulp.src 'assets/scss/main.scss'
		.pipe sass({ errLogToConsole: true })
		.pipe gulp.dest 'cache/.temp/css/'

gulp.task 'css:concat', ['css:compile'], ->
	gulp.src [
			'bower_components/normalize.css/normalize.css'
			'bower_components/basicContext/dist/basicContext.min.css'
			'bower_components/basicNotification/dist/basicNotification.min.css'
			'cache/.temp/css/*.css'
		]
		.pipe concat {path: 'main.css', stat: {mode: "0666"}}
		.pipe gulp.dest 'cache/.temp/'

gulp.task 'css:minify', ['css:concat'], ->
	gulp.src 'cache/.temp/main.css'
		.pipe autoprefixer {
			browsers: ['last 2 versions'],
			cascade: false
		}
		.pipe minify {}
		.pipe gulp.dest 'cache/'

###
# JavaScript tasks
###
gulp.task 'js:compile', ->
	gulp.src 'assets/coffee/*.coffee'
		.pipe coffee { bare: true }
		.pipe gulp.dest 'cache/.temp/js'

gulp.task 'js:concat', ['js:compile'], ->
	gulp.src [
			'bower_components/jQuery/dist/jquery.min.js'
			'bower_components/mousetrap/mousetrap.min.js'
			'bower_components/mousetrap/plugins/global-bind/mousetrap-global-bind.min.js'
			'bower_components/basicModal/dist/basicModal.min.js'
			'bower_components/basicContext/dist/basicContext.min.js'
			'bower_components/basicNotification/dist/basicNotification.min.js'
			'bower_components/basicFit/dist/basicFit.min.js'
			'assets/js/*.js'
			'cache/.temp/js/*.js'
		]
		.pipe concat 'main.js', { newLine: '\n' }
		.pipe header '/*! <%= pkg.name %> <%= pkg.version %> | <%= now.getFullYear() %>-<%= now.getMonth() %> */\n', { pkg: pkg, now: new Date() }
		.pipe gulp.dest 'cache/.temp/'

gulp.task 'js:minify', ['js:concat'], ->
	gulp.src 'cache/.temp/main.js'
		.pipe uglify {preserveComments: 'all'} # need an empty hash
		.pipe gulp.dest 'cache/'

###
# Tracking tasks
###
gulp.task 'tracking:compile', ->
	gulp.src 'tracking/ackee.coffee'
		.pipe coffee { bare: true }
		.pipe gulp.dest 'cache/.temp/tracking'

gulp.task 'tracking:concat', ['tracking:compile'], ->
	gulp.src [
			'bower_components/json2/json2.js'
			'bower_components/platform/platform.js'
			'cache/.temp/tracking/ackee.js'
		]
		.pipe concat { path: 'tracking.js', stat: { mode: "0666" } }
		.pipe gulp.dest 'cache/.temp'

gulp.task 'tracking:minify', ['tracking:concat'], ->
	gulp.src 'cache/.temp/tracking.js'
		.pipe uglify {} # need an empty hash
		.pipe gulp.dest 'cache/'

###
# Leafs tasks
###
gulp.task 'leafs-js:compile', ->
	gulp.src 'leafs/*/client.coffee'
		.pipe coffee { bare: true }
		.pipe gulp.dest 'cache/.temp/leafs-js'

gulp.task 'leafs-js:concat', ['leafs-js:compile'], ->
	gulp.src 'cache/.temp/leafs-js/*/client.js'
		.pipe concat 'leafs.js', {}
		.pipe gulp.dest 'cache/.temp'

gulp.task 'leafs-js:minify', ['leafs-js:concat'], ->
	gulp.src 'cache/.temp/leafs.js'
		.pipe uglify {} # need an empty hash
		.pipe gulp.dest 'cache/'

gulp.task 'leafs-css:compile', ->
	gulp.src 'leafs/*/*.scss'
		.pipe sass({ includePaths: ['assets/scss'], errLogToConsole: true })
		.pipe gulp.dest 'cache/.temp/leafs/'

gulp.task 'leafs-css:concat', ['leafs-css:compile'], ->
	gulp.src 'cache/.temp/leafs/*/*.css'
		.pipe concat {path: 'leafs.css', stat: {mode: "0666"}}
		.pipe gulp.dest 'cache/.temp/'

gulp.task 'leafs-css:minify', ['leafs-css:concat'], ->
	gulp.src 'cache/.temp/leafs.css'
	 .pipe autoprefixer {
				browsers: ['last 2 versions'],
				cascade: false
			}
		.pipe minify {keepBreaks:true}
		.pipe gulp.dest 'cache/'

gulp.task 'leafs-json', ->
	gulp.src 'leafs/*/package.json'
		.pipe concat 'leafs.json', {newLine: ',\n' }
		.pipe header "[\n", {}
		.pipe footer '\n]'
		.pipe gulp.dest 'cache'

###
# Watch files
###
gulp.task 'watch-js', ->
	gulp.watch [
		'assets/coffee/*.coffee'
		'assets/js/*.js'
	], ->
		gulp.start 'js'

gulp.task 'watch-css', ->
	gulp.watch 'assets/scss/*.scss', ->
		gulp.start 'css'

gulp.task 'watch-leafs', ->
	gulp.watch 'leafs/**/*', ->
		gulp.start 'leafs'

gulp.task 'watch-tracking', ->
	gulp.watch 'tracking/*', ->
		gulp.start 'tracking'

###
# Cleaning temp folder
###
gulp.task 'clean', ->
	del "cache/.temp"

###
# Exec
###
gulp.task 'shorthand', ->
	shell.task 'for fn in `cat filenames.txt`; do'

###
# Registered tasks
###
gulp.task 'default', [
	'js'
	'css'
	'leafs'
	'tracking'
]

gulp.task 'css', [
	'css:compile'
	'css:concat'
	'css:minify'
]

gulp.task 'js', [
	'js:compile'
	'js:concat'
	'js:minify'
]

gulp.task 'tracking', [
	'tracking:compile'
	'tracking:concat'
	'tracking:minify'
]

gulp.task 'leafs', [
	'leafs-json'
	'leafs-js:compile'
	'leafs-js:concat'
	'leafs-js:minify'
	'leafs-css:compile'
	'leafs-css:concat'
	'leafs-css:minify'
]

gulp.task 'watch', [
	'watch-css'
	'watch-js'
	'watch-leafs'
	'watch-tracking'
]

gulp.task 'temp', [
	'clean'
]
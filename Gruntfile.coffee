module.exports = (grunt) ->

	grunt.initConfig

		pkg: grunt.file.readJSON 'package.json'

		coffee:

			assets:
				files:
					'cache/.temp/main.js': 'assets/coffee/*.coffee'

			leafs:
				files:
					'cache/.temp/leafs.js': 'leafs/*/client.coffee'

			tracking:
				files:
					'cache/.temp/tracking.js': 'tracking/ackee.coffee'

		sass:

			assets:
				files: [{
					expand: true
					cwd: 'assets/scss/'
					src: ['*.scss']
					dest: 'cache/.temp/assets_css/'
					ext: '.css'
				}]

			leafs:
				files:
					'cache/.temp/leafs.css': 'cache/.temp/leafs.scss'

		concat:

			css:
				options:
					separator: "\n"
				src: [
					'bower_components/normalize.css/normalize.css'
					'assets/css/*.css'
					'cache/.temp/assets_css/*.css'
				]
				dest: 'cache/.temp/main.css'

			js:
				options:
					separator: "\n"
				src: [
					'bower_components/jQuery/dist/jquery.min.js'
					'bower_components/js-md5/js/md5.min.js'
					'bower_components/mousetrap/mousetrap.min.js'
					'bower_components/mousetrap/plugins/global-bind/mousetrap-global-bind.min.js'
					'assets/js/*.js'
					'cache/.temp/main.js'
				]
				dest: 'cache/.temp/main.js'

			leafs:
				options:
					separator: "\n"
				src: 'leafs/*/*.scss',
				dest: 'cache/.temp/leafs.scss'

			json:
				options:
					banner: '['
					separator: ','
					footer: ']'
				src: 'leafs/*/package.json'
				dest: 'cache/leafs.json'

			tracking:
				options:
					separator: "\n"
				src: [
					'tracking/json2.js'
					'bower_components/platform/platform.js'
					'cache/.temp/tracking.js'
				]
				dest: 'cache/.temp/tracking.js'

		uglify:

			assets:
				options:
					banner: '/*! <%= pkg.name %> <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				files:
					'cache/main.js': 'cache/.temp/main.js'

			leafs:
				options:
					banner: '/*! <%= pkg.name %> <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				files:
					'cache/leafs.js': 'cache/.temp/leafs.js'

			tracking:
				options:
					banner: '/*! <%= pkg.name %> <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				files:
					'cache/tracking.js': 'cache/.temp/tracking.js'

		cssmin:

			assets:
				options:
					banner: '/*! <%= pkg.name %> <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */'
				files:
					'cache/main.css': 'cache/.temp/main.css'

			leafs:
				options:
					banner: '/*! <%= pkg.name %> <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %> */'
				files:
					'cache/leafs.css': 'cache/.temp/leafs.css'

		watch:

			js:
				files: [
					'assets/coffee/*.coffee'
					'assets/js/*.js'
				]
				tasks: ['js']
				options:
					spawn: false
					interrupt: true

			scss:
				files: [
					'assets/scss/*.scss'
					'assets/css/*.css'
				]
				tasks: ['css']
				options:
					spawn: false
					interrupt: true

			leafs:
				files: 'leafs/*/*'
				tasks: ['leafs']
				options:
					spawn: false
					interrupt: true

			tracking:
				files: 'tracking/*'
				tasks: ['tracking']
				options:
					spawn: false
					interrupt: true

		clean: ['cache/.temp/']

	require('load-grunt-tasks')(grunt)

	grunt.registerTask 'default', ->
		grunt.task.run [
			'js'
			'css'
			'leafs'
			'tracking'
			'temp'
		]

	grunt.registerTask 'js', [
		'coffee:assets'
		'concat:js'
		'uglify:assets'
	]
	grunt.registerTask 'css', [
		'sass:assets'
		'concat:css'
		'cssmin:assets'
	]
	grunt.registerTask 'leafs', [
		'coffee:leafs'
		'concat:leafs'
		'concat:json'
		'sass:leafs'
		'uglify:leafs'
		'cssmin:leafs'
	]
	grunt.registerTask 'tracking', [
		'coffee:tracking'
		'concat:tracking'
		'uglify:tracking'
	]
	grunt.registerTask 'temp', [
		'clean'
	]
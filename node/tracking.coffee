# Dependencies
jsesc		= require 'jsesc'
validator	= require 'validator'

# Ackee modules
db = require './db'

# Variables
file	 =
	main: 'cache/tracking.js'
	ignore: 'tracking/ignore.js'
	ignoreIp: 'tracking/ignoreIp.js'
	dnt: 'tracking/dnt.js'

parse =

	visits: (req, callback, error) ->

		# Check if required data exists

		if not req.ip? or not validator.isIP req.ip
			error 'ip', null
			return false

		if not req.query?
			error 'params', null
			return false

		if not req.query.referrer?
			error 'referrer', req.query.referrer
			return false

		if not req.query.site? or not validator.isURL req.query.site
			error 'site', req.query.site
			return false

		if not req.query.site_title? or not validator.isLength req.query.site_title, 0, 300
			error 'site_title', req.query.site_title
			return false

		if not req.query.language? or not validator.isLength req.query.language, 0, 2
			error 'language', req.query.language
			return false

		if not req.query.browser? or not validator.isLength req.query.browser, 0, 100
			error 'browser', req.query.browser
			return false

		if not req.query.browser_version? or not validator.isLength req.query.browser_version, 0, 100
			error 'browser_version', req.query.browser_version
			return false

		if not req.query.browser_width? or not validator.isInt req.query.browser_width
			error 'browser_width', req.query.browser_width
			return false

		if not req.query.browser_height? or not validator.isInt req.query.browser_height
			error 'browser_height', req.query.browser_height
			return false

		if not req.query.platform? or not validator.isLength req.query.platform, 0, 100
			error 'platform', req.query.platform
			return false

		if not req.query.screen_width? or not validator.isInt req.query.screen_width
			error 'screen_width', req.query.screen_width
			return false

		if not req.query.screen_height? or not validator.isInt req.query.screen_height
			error 'screen_height', req.query.screen_height
			return false

		# Set data when empty or null
		# Escape data

		for key, value of req.query
			value = '-' if value is '' or value is 'null'
			value = jsesc value

		# Data specific parsing

		req.query.language = req.query.language.toLowerCase()
		req.query.platform = switch req.query.platform
			when req.query.platform.indexOf	'Windows' isnt -1	then 'Windows'
			when req.query.platform.indexOf	'windows' isnt -1	then 'Windows'
			when req.query.platform.indexOf	'OS X' isnt -1		then 'OS X'
			when req.query.platform.indexOf	'Ubuntu' isnt -1	then 'Ubuntu'
			else req.query.platform

		callback()
		return true

	duration: (req, callback, error) ->

		# Check if required data exists

		if not req.ip? or not validator.isIP req.ip
			error 'ip', null
			return false

		if not req.query?
			error 'params', null
			return false

		if not req.query.id? or not validator.isInt req.query.id
			error 'id', req.query.id
			return false

		# Set data when empty or null
		# Escape data

		for key, value of req.query
			value = '-' if value is '' or value is 'null'
			value = jsesc value

		callback()
		return true

tracking = module.exports =

	set:

		visit: (req, res) ->

			parse.visits req, ->

				ip = '-'

				# Save IP
				ip = req.ip if process.env.npm_package_config_anonymize isnt 'true'

				timezoneOffset	= (+new Date().getTimezoneOffset()) * 60
				currentTime		= Math.round(+new Date()/1000) - timezoneOffset

				# Required data available
				db.source.run 'INSERT INTO stats VALUES (NULL, $ip, $referrer, $site, $site_title, $time, $duration, $language, $browser, $browser_version, $browser_width, $browser_height, $platform, $screen_width, $screen_height)',

					$ip: ip
					$referrer: req.query.referrer
					$site: req.query.site
					$site_title: req.query.site_title
					$time: currentTime
					$duration: currentTime
					$language: req.query.language
					$browser: req.query.browser
					$browser_version: req.query.browser_version
					$browser_width: req.query.browser_width
					$browser_height: req.query.browser_height
					$platform: req.query.platform
					$screen_width: req.query.screen_width
					$screen_height: req.query.screen_height

				, (error) ->

					if error or not this.lastID?
						res.json { error: 'Could not store data in database', details: error }
						return false

					res.json { id: this.lastID }
					return true

			, (error, data) ->

				# Required data missing
				res.json 400, { error: 'Parameter ' + error + ' missing or invalid', details: data }
				return false


		duration: (req, res) ->

			parse.duration req, ->

				ip = '-'

				# Save IP
				ip = req.ip if process.env.npm_package_config_anonymize isnt 'true'

				timezoneOffset	= (+new Date().getTimezoneOffset()) * 60
				currentTime		= Math.round(+new Date()/1000) - timezoneOffset

				db.source.run 'UPDATE stats SET duration = $duration WHERE id = $id AND ip = $ip',

					$duration: currentTime
					$id: req.query.id
					$ip: ip

				, (error) ->

					if error
						res.json { error: 'Could not store data in database', details: error }
						return false

					res.json true
					return true

			, (error, data) ->

				# Required data missing
				res.json 400, { error: 'Parameter ' + error + ' missing or invalid', details: data }
				return false

	get: (req, res) ->

		# Just to prevent space in config
		ignoredIps = process.env.npm_package_config_ignoreIps.split ','
		for ip, index in ignoredIps
			ignoredIps[index] = ip.trim()

		if req.cookies.AckeeIgnore is 'true'

			# Ignore
			res.sendFile file.ignore, {root: '.'}
			return true

		else if req.ip in ignoredIps

			# IgnoreIp
			res.sendFile file.ignoreIp, {root: '.'}
			return true

		else if req.headers?.dnt is '1' and process.env.npm_package_config_dnt is 'true'

			# Do not track
			res.sendFile file.dnt, {root: '.'}
			return true

		else

			# Return tracking file
			res.sendFile file.main, {root: '.'}
			return true

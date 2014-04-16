url			= require 'url'
middleware	= require '../../node/middleware'
db			= null

settings =

	ignore: '-'
	limit: 50

query =

	recent: ->

		"""
		SELECT referrer, site, site_title, time
		 FROM stats
		 WHERE referrer<>'#{ settings.ignore }' AND site<>'#{ settings.ignore }' AND site_title<>'#{ settings.ignore }'
		 ORDER BY time DESC
		 LIMIT #{ settings.limit }
		"""

	repeating: ->

		"""
		SELECT referrer, count(*) AS visits
		 FROM stats
		 WHERE referrer<>'#{ settings.ignore }'
		 GROUP BY referrer
		 ORDER BY visits DESC
		 LIMIT #{ settings.limit }
		"""

parse =

	recent: (row) ->

		from = url.parse row.referrer
		return null if not from?.host?

		to = url.parse row.site
		return null if not to?.host?

		if from.protocol is to.protocol and from.host is to.host
			return null

		row.referrer = {
			href: from.href
			host: from.host.replace 'www.', ''
			path: from.pathname
		}

		row.referrer.path = '' if row.referrer.path is '/'

		return row

	repeating: (row) ->

		from = url.parse row.referrer
		return null if not from?.host?

		row.referrer = {
			href: from.href
			host: from.host.replace 'www.', ''
			path: from.pathname
		}

		row.referrer.path = '' if row.referrer.path is '/'

		return row

get =

	recent: (req, res) ->

		db.all query.recent(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				rows = (parse.recent row for row in rows)
				res.json rows
				return true

	repeating: (req, res) ->

		db.all query.repeating(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				rows = (parse.repeating row for row in rows)
				res.json rows
				return true

module.exports = (app, _db) ->

	db = _db
	app.get '/api/get/referrers/recent', middleware.auth, get.recent
	app.get '/api/get/referrers/repeating', middleware.auth, get.repeating
url			= require 'url'
middleware	= require '../../node/middleware'
db			= null

settings =

	ignore: '-'
	limit: 30
	
query =

	popular: ->
	
		"""
		SELECT site, site_title, time, count(*) AS visits
		 FROM stats
		 WHERE site<>'#{ settings.ignore }' AND site_title<>'#{ settings.ignore }'
		 GROUP BY site_title
		 ORDER BY visits DESC
		 LIMIT #{ settings.limit }
		"""
		
	recent: ->
	
		"""
		SELECT site, site_title, time
		 FROM stats
		 WHERE site<>'#{ settings.ignore }' AND site_title<>'#{ settings.ignore }'
		 ORDER BY time DESC
		 LIMIT #{ settings.limit }
		"""

get =

	popular: (req, res) ->
	
		db.all query.popular(), (error, rows) ->
		
			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				res.json rows
				return true

	recent: (req, res) ->
		
		db.all query.recent(), (error, rows) ->
		
			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				res.json rows
				return true

module.exports = (app, _db) ->

	db = _db
	app.get '/api/get/pages/popular', middleware.auth, get.popular
	app.get '/api/get/pages/recent', middleware.auth, get.recent
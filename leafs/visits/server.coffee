async		= require 'async'
middleware	= require '../../node/middleware'
db			= null

settings =

	limit: 7

query =

	hour: ->

		"""
		SELECT DATETIME(time, "unixepoch") date, strftime("%H", time, "unixepoch") hour, strftime("%Y-%m-%d", time, "unixepoch") hour_full, COUNT() count
		 FROM stats
		 WHERE date > DATETIME('now', '-7 hour')
		 GROUP BY hour
		 ORDER BY time DESC
		 LIMIT #{ settings.limit }
		"""

	week: ->

		"""
		SELECT DATE(time, "unixepoch") date, strftime("%w", time, "unixepoch") day, count(*) count
		 FROM stats
		 GROUP BY date
		 ORDER BY time DESC
		 LIMIT #{ settings.limit }
		"""

	month: ->

		"""
		SELECT strftime("%m", time, "unixepoch") month, COUNT() count
		 FROM stats
		 GROUP BY month
		 ORDER BY time DESC
		 LIMIT #{ settings.limit }
		"""

parse =

	hour: (rows, callback) ->

		highest	= 0

		async.each rows, (row, finish) ->

			highest		= row.count if row.count > highest
			row.title 	=
				short: row.hour
				full: row.hour_full

			delete row.hour
			delete row.hour_full

			finish()

		, (error) ->

			callback {
				rows: rows.reverse()
				highest: parse.highest highest
			}

	week: (rows, callback) ->

		highest	= 0
		weekday	= ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

		async.each rows, (row, finish) ->

			highest		= row.count if row.count > highest
			row.title	=
				short: weekday[row.day]
				full: row.date

			delete row.date
			delete row.day

			finish()

		, (error) ->

			callback {
				rows: rows.reverse()
				highest: parse.highest highest
			}

	month: (rows, callback) ->

		highest	= 0
		months	=
			short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

		async.each rows, (row, finish) ->

			highest		= row.count if row.count > highest
			row.title 	=
				short: months.short[row.month-1]
				full: months.full[row.month-1]

			delete row.month

			finish()

		, (error) ->

			callback {
				rows: rows.reverse()
				highest: parse.highest highest
			}

	highest: (highest) ->

		highest =
			num: highest

		highest.s4 = Math.ceil(highest.num/10)*10
		highest.s3 = (highest.s4/4)*3
		highest.s2 = highest.s4/2
		highest.s1 = highest.s4/4

		delete highest.num

		return highest

get =

	hour: (req, res) ->

		db.all query.hour(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				parse.hour rows, (data) ->
					res.json data
					return true

	week: (req, res) ->

		db.all query.week(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				parse.week rows, (data) ->
					res.json data
					return true

	month: (req, res) ->

		db.all query.month(), (error, rows) ->

			if error
				res.json { error: 'Could not get data from database', details: error }
				return false
			else
				parse.month rows, (data) ->
					res.json data
					return true

module.exports = (app, _db) ->

	db = _db
	app.get '/api/get/visits/hour', middleware.auth, get.hour
	app.get '/api/get/visits/week', middleware.auth, get.week
	app.get '/api/get/visits/month', middleware.auth, get.month

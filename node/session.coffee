# Ackee modules
db = require './db'

session = module.exports =

	init: (req, res) ->

		db.settings.get (rows) ->

			if	rows?.username? and
				rows.password? and
				req.session?.login? and
				req.session.login is true

					# Logged in
					res.cookie 'AckeeIgnore', 'true', { maxAge: 3600000*35*30, httpOnly: true }
					res.json {
						login: true
						username: rows.username
						version: process.env.npm_package_version
						configured: true
					}

			else

				# Not logged in
				res.json {
					login: false
					version: process.env.npm_package_version
					configured: if rows?.username? and rows.password? then true else false
				}

	login: (req, res) ->

		db.settings.get (rows) ->

			if	not rows?.username? or
				not rows?.password?

					# Entries not found
					res.json { error: 'Could not find username or password in database', details: error }
					return false

			else if	rows.username? and
					rows.password? and
					req.query? and
					req.query.username is rows.username and
					req.query.password is rows.password

						# Login vaild
						req.session.login = true
						res.json true
						return true

			else

				# Required data missing
			 	res.json false
				return false

	logout: (req, res) ->

		delete req.session.login
		res.json true
		return true
# Ackee modules
db = require './db'
bcrypt = require 'bcrypt'

cookieName = 'AckeeIgnore'

session = module.exports =

	init: (req, res) ->

		db.settings.get (rows) ->

			if	rows?.username? and
				rows.password? and
				req.session?.login? and
				req.session.login is true

					# Logged in
					res.cookie cookieName, 'true', { maxAge: 3600000*35*30, httpOnly: true }
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
					name: process.env.npm_package_name
					configured: if rows?.username? and rows.password? then true else false
				}

	login: (req, res) ->

		db.settings.get (rows) ->

			if	not rows?.username? or
				not rows?.password?

					# Entries not found
					res.json { error: 'Could not find username or password in database', details: null }
					return false

			else if	rows.username? and
					rows.password? and
					req.query? and
					req.query.password? and
					req.query.username is rows.username

						bcrypt.compare req.query.password, rows.password, (err, result) ->

							if err?

								# Unknown error
								res.json { error: 'Could not compare password with password in database', details: err }
								return false

							else if result is true

								# Login valid
								req.session.login = true
								res.json true
								return true

							else

								res.json false
								return false

			else

				# Required data missing
			 	res.json false
				return false

	logout: (req, res) ->

		delete req.session.login
		res.clearCookie cookieName
		res.json true
		return true

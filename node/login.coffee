# Dependencies
jsesc		= require 'jsesc'
async		= require 'async'

# Ackee modules
db			= require './db'
log			= require './log'
session		= require './session'

login = module.exports =

	set: (req, res) ->

		parse = (req, callback, error) ->

			# Check if required data exists

			if not req.query?
				error 'params'
				return false

			if not req.query.username?
				error 'username'
				return false

			if not req.query.password?
				error 'password'
				return false

			# Escape data

			for key, value of req.query
				value = jsesc value

			callback()
			return true

		db.settings.get (rows) ->

			if	rows?.username? and
				rows?.password? and
				req.session.login isnt true

					# Entries found
					res.json { error: 'No permissions to change username and password', details: null }
					return false

			parse req, ->

				async.parallel [

					(pCallback) ->

						# Set username
						db.settings.set 'username', req.query.username, pCallback

					(pCallback) ->

						# Set password
						db.settings.set 'password', req.query.password, pCallback

				], (error) ->

					if error
						res.json { error: 'Could not store username or password in database', details: error }
						return false

					# Continue when successful
					session.login req, res
					return true

			, (error) ->

				# Required data missing
				res.json 400, { error: 'Parameter ' + error + ' required' }
				return false

	reset: (req, res) ->

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
						req.session.login = false

						# Remove login
						async.parallel [

							(pCallback) ->

								db.settings.remove 'username', pCallback

							(pCallback) ->

								db.settings.remove 'password', pCallback

						], (error) ->

								res.json true
								return true

			else

				# Required data missing
				res.json false
				return false
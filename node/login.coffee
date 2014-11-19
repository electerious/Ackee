# Dependencies
jsesc		= require 'jsesc'
async		= require 'async'
bcrypt		= require 'bcrypt'

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

						bcrypt.genSalt 10, (err, salt) ->

							if err?

								# Error
								pCallback err
								return false

							# Hash password
							bcrypt.hash req.query.password, salt, (err, hash) ->

								if err?

									# Error
									pCallback err
									return false

								# Set password
								db.settings.set 'password', hash, pCallback

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
					req.query.password? and
					req.query.username is rows.username

						bcrypt.compare req.query.password, rows.password, (err, result) ->

							if err?

								# Unknown error
								res.json { error: 'Could not compare password with password in database', details: err }
								return false

							else if result is true

								# Login vaild => Logout
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

			else

				# Required data missing
				res.json false
				return false

# Dependencies
jsesc		= require 'jsesc'
async		= require 'async'

# Ackee modules
leafs		= require './leafs'
db			= require './db'
log			= require './log'
login		= require './login'
middleware	= require './middleware'
session		= require './session'
tracking	= require './tracking'

error =

	e401: (req, res) ->

		res.json 401, { error: 'You are not authorized to view this page' }
		return true

module.exports = (app, callback) ->

	log.status 'api', 'Setting routes'

	# Session
	app.all '/api/session/init', session.init
	app.get '/api/session/login', session.login
	app.all '/api/session/logout', session.logout

	# Login
	app.get '/api/login/set', login.set
	app.get '/api/login/reset', middleware.auth, login.reset

	# SET API
	app.get '/api/set/visit', middleware.allowOrigin, tracking.set.visit
	app.get '/api/set/duration', middleware.allowOrigin, tracking.set.duration

	# GET API
	app.get '/api/get/tracking', middleware.allowOrigin, tracking.get
	app.all '/!', middleware.allowOrigin, tracking.get

	# Error
	app.all '/401', error.e401

	callback()
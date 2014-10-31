# Server
http		= require 'http'
https		= require 'https'

# Express
express		= require 'express'
app			= express()
compress	= require 'compression'
morgan		= require 'morgan'
cookieParser= require 'cookie-parser'
session		= require 'express-session'

# Dependencies
sqlite		= require 'sqlite3'
fs			= require 'fs'
async		= require 'async'
crypto		= require 'crypto'

# Ackee modules
api			= require './api'
data		= require './data'
db			= require './db'
leafs		= require './leafs'
log			= require './log'
middleware	= require './middleware'

# Variables
ssl = {}

# Init
init = ->

	async.series [

		(callback) ->

			# Create data
			data.create ->
				callback()

		(callback) ->

			async.parallel [

				(pCallback) ->

					# SSL key
					fs.readFile 'data/key.pem', (error, data) ->
						ssl.key = data if not error?
						pCallback null

				(pCallback) ->

					# SSL cert
					fs.readFile 'data/cert.pem', (error, data) ->
						ssl.cert = data if not error?
						pCallback null

				(pCallback) ->

					# Load database
					db.load ->
						pCallback null

			], (error) ->

				# Continue when successful
				return callback() if not error?

				# Show error
				log.status 'init', 'Loading SSL or database failed', error
				return false

		(callback) ->

			log.status 'init', 'Setting server configuration'

			# App configuration
			app.use morgan('dev') if process.env.npm_package_config_debug is 'true'
			app.use compress()
			app.use cookieParser(crypto.randomBytes(20).toString('hex'))
			app.use session({secret: crypto.randomBytes(20).toString('hex'), saveUninitialized: true, resave: true})
			app.use middleware.security
			app.use express.static(__dirname + '/..')
			app.set 'trust proxy', 'loopback'

			callback()

		(callback) ->

			# Init API
			api app, callback

		(callback) ->

			# Load leafs
			leafs app, db, callback

		(callback) ->

			log.status 'init', 'Starting server'

			# Start http server
			http = http.createServer app
			http.on 'error', (e) ->
				log.warning 'init', 'Port is already in use' if e.code is 'EADDRINUSE'
				log.error 'init', 'Can not start http server', e
			http.listen process.env.npm_package_config_port

			# Start https server
			if ssl?.key? and ssl.cert?
				https = https.createServer ssl, app
				https.on 'error', (e) ->
					log.warning 'init', 'Port is already in use' if e.code is 'EADDRINUSE'
					log.error 'init', 'Can not start https server', e
				https.listen process.env.npm_package_config_portSSL

			# Output notice
			text =	"""
					Ackee running at
							  => http://localhost:#{ process.env.npm_package_config_port }

					"""
			text +=	"		  => https://localhost:#{ process.env.npm_package_config_portSSL }" if ssl?.key? and ssl.cert?
			log.status 'init', text

	]

module.exports = init

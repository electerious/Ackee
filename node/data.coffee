# Dependencies
fs = require 'fs'

# Ackee modules
log = require './log'

data = module.exports =

	dir: 'data/'

	create: (callback) ->

		log.status 'data', 'Reading folder'

		fs.mkdir data.dir, (error) ->

			if not error
				log.warning 'data', 'Missing folder', error
				log.status 'data', 'Creating folder'

			callback()
			return true

	store: (name, data, callback) ->

		log.status 'data', "Saving #{ name }"

		fs.writeFile module.exports.dir + name, data, (error) ->

			if error
				log.error 'data', "Could not save #{ name }", error
				return false

			callback()
			return true
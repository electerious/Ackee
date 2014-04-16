# Dependencies
fs		= require 'fs'
async	= require 'async'

# Ackee modules
log		= require './log'

# Variables
list	= 'cache/leafs.json'

leafs = module.exports = (app, db, callback) ->

	log.status 'leafs', 'Getting list of leafs'

	fs.readFile list, (error, data) ->

		if error
			log.error 'leafs', "Could not read #{ list }", error
			return false

		# Parse leafs
		data = JSON.parse data

		# Load leafs
		async.each data, (leaf, finish) ->

			log.status 'leafs', "Loading #{ leaf.name }"
			require('./../leafs/' + leaf.name + '/' + leaf.main) app, db.source
			finish()

		, callback
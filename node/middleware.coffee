middleware = module.exports =

	auth: (req, res, next) ->

		if req.session?.login? and req.session.login is true
			res.header 'Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
			next()
			return true
		else
			res.redirect '/401'
			return false

	security: (req, res, next) ->

		error = false

		# Banned items
		banned = [
			'data/'
			'leafs/'
			'node/'
			'tracking/'
		]

		# For each banned item do ...
		banned.forEach (element, index, array) ->

			# Is banned?
			error = true if req.path.indexOf(element) isnt -1

			# Finish
			if index is (array.length-1)
				if error
					res.redirect '/401'
					return false
				else
					next()
					return true


	allowOrigin: (req, res, next) ->

		res.header 'Access-Control-Allow-Origin', '*'
		res.header 'Access-Control-Allow-Methods', 'GET'
		res.header 'Access-Control-Allow-Headers', 'X-Requested-With'
		next()
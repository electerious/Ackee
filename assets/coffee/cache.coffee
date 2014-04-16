this.cache =

	timer: null
	status: 0
	urls: []
	data: {}

	init: ->

		$(document).ajaxStart ->
			clearTimeout cache.time

		$(document).ajaxStop ->
			return false if cache.status is 1
			cache.time = setTimeout ->
				cache._start()
			, 2000

	_start: (callback) ->

		if	cache.urls.length is 0 or
			cache.status is 1
				return false

		cache.urls.forEach (url, i, array) ->
			cache._api url, (data) ->
				cache.data[url] = data if data isnt false

		cache.status = 1

	_api: (url, callback) ->

		$.ajax
			type: 'GET'
			url: url
			dataType: 'json'
			error: (jqXHR, textStatus, errorThrown) ->

				callback false
				return false

			success: (data) ->

				if data?.error?

					callback false
					return false

				callback data
				return true
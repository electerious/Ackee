this.ackee =

	settings:

		site: 'http://ackee.electerious.com'
		github: 'https://github.com/electerious/Ackee'
		init: null

	init: ->

		# Bind hotkeys
		Mousetrap.bindGlobal 'enter', () ->
			if basicModal.visible() is true
				basicModal.action()

		Mousetrap.bindGlobal 'esc', () ->
			if $('.basicModalContainer[data-closable=true]').length isnt 0
				basicModal.cancel()
			else if basicContext.visible() is true
				basicContext.close()

		ackee.api 'api/session/init', (data) ->

			if	data?.configured? and
				data.configured is false

					# Not configured
					login.set()
					return true

			if	data?.login? and
				data.login is true

					# Save data
					ackee.settings.init = data

					# Logged in
					menu.init '#menu'
					basicFit.init '#content', '.leaf'
					leafs.init()
					cache.init()
					return true

			if	data?.login? and
				data.login is false

					# Not logged in
					login.show data
					return true

	serialize: (obj) ->

		str = []
		for p of obj
			if obj.hasOwnProperty(p)
				str.push encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
		return str.join "&"

	server: ->

		url = window.location.protocol + "//" + window.location.host
		if url.substr(-1) isnt '/' then url += '/'
		return url

	api: (url, callback) ->

		if cache.data.hasOwnProperty(url)
			callback cache.data[url]
			return true

		# Show notification
		loading = setTimeout ->
			loading = basicNotification.show {
				icon: 'ion-ios7-clock'
				text: 'Still loading ...'
				pin: true
			}
		, 3000

		$.ajax
			type: 'GET'
			url: url
			dataType: 'json'
			error: (jqXHR, textStatus, errorThrown) ->

				# Hide notification
				clearTimeout loading if loading
				basicNotification.close loading if loading >= 100

				errorThrown = 'Unknown' if errorThrown is ''

				# Show error
				basicNotification.show {
					icon: 'ion-alert-circled'
					text: "Request failed and server returned: #{ errorThrown }"
				}
				console.error {
					url: url
					jqXHR: jqXHR
					textStatus: textStatus
					errorThrown: errorThrown
				}
				callback false
				return false

			success: (data) ->

				# Hide notification
				clearTimeout loading if loading
				basicNotification.close loading if loading >= 100

				if data?.error?

					# Show error
					basicNotification.show {
						icon: 'ion-alert-circled'
						text: data.error
					}
					console.error data
					callback false
					return false

				callback data
				return true

	dom:

		content: $('#content')
		module: (name) -> ackee.dom.content.find("##{ name }")

	logout: ->

		ackee.api 'api/session/logout', (data) ->
			window.location.reload()

$(document).ready -> ackee.init()
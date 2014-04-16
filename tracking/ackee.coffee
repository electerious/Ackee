this.ackee =

	id: null

	path: 'api/set/'

	data:

		referrer: document.referrer or '-'
		site: location.href
		site_title: document.title
		language: navigator.language.substring 3, 5
		browser: platform.name
		browser_version: platform.version
		browser_width: document.documentElement.clientWidth or window.innerWidth
		browser_height: document.documentElement.clientHeight or window.innerHeight
		platform: platform.os.family
		screen_width: screen.width
		screen_height: screen.height
		cache: new Date()

	serialize: (obj) ->

		str = []
		for p of obj
			if obj.hasOwnProperty(p)
				str.push encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])
		return str.join "&"

	getServer: ->

		script = document.querySelectorAll('script[data-ackee]')[0]

		if script? then src = script.src.replace '!', ''
		else src = ''

		return src

	getXMLHttpRequest: ->

		try
			# Firefox, Opera 8.0+, Safari
			xmlHttp = new XMLHttpRequest
		catch e
			# Internet Explorer
			try
				xmlHttp = new ActiveXObject 'Msxml2.XMLHTTP'
			catch e
				try
					xmlHttp = new ActiveXObject 'Microsoft.XMLHTTP'
				catch e
					comsole.log 'Your browser does not support AJAX!'
					return false;
		return xmlHttp

	send:

		visit: ->

			return false if document.location.hostname is "localhost"

			xhr = ackee.getXMLHttpRequest()

			xhr.open 'GET', ackee.getServer() + ackee.path + 'visit?' + ackee.serialize(ackee.data)

			xhr.onload = ->
				if xhr.status is 200
					if JSON.parse(xhr.responseText).id
						ackee.id = JSON.parse(xhr.responseText).id
						window.setInterval 'ackee.send.duration()', 10000
					else
						console.log 'Ackee Error:'
						console.log 'Can not get id from Ackee'
						console.log xhr.responseText
				else
					console.log 'Ackee Server not found:'
					console.log xhr.responseText

			xhr.send()

		duration: ->

			xhr = ackee.getXMLHttpRequest()

			xhr.open 'GET', ackee.getServer() + ackee.path + 'duration?id=' + ackee.id

			xhr.onload = ->
				if xhr.responseText isnt 'true'
					console.log 'Ackee Error:'
					console.log xhr.responseText

			xhr.send()

ackee.send.visit()
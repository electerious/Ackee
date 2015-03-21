this.leafs =

	_files:
		css: 'cache/leafs.css'
		js: 'cache/leafs.js'
		json: 'cache/leafs.json'

	_build: (module) ->

		"""
		<div id='#{ module.name }' class='leaf #{ module.theme }'>
			<div class='header'>
				<h1>#{ module.title }</h1>
				<div class='switch'>
					<span></span>
					<a class='ion-arrow-down-b'></a>
				</div>
			</div>
		</div>
		"""

	init: ->

		# Load css and js files
		$('head').append "<link rel='stylesheet' href='#{ leafs._files.css }' type='text/css'>"
		$('head').append "<script type='text/javascript' src='#{ leafs._files.js }'></script>"

		# Save json
		ackee.api leafs._files.json, (data) ->

			return false if not data?

			leafs._files.json = data
			return true

		return true

	add: (module) ->

		module.name	= encodeURI(module.title).toLowerCase()
		module.dom	= -> ackee.dom.module(module.name)
		ackee.dom.content.append leafs._build(module)
		basicFit.refresh()
		module.init()
this.settings =

	addSites: ->

		code = "<script async data-ackee type='text/javascript' src='#{ ackee.server() }!'></script>".replace "'", "&apos;"

		basicModal.show
			body:	"""
					<h1>Add Sites</h1>
					<p>Paste the following code into the HTML-body of every website you want to track.</p>
					<input class="text" type="text" data-name="script" value="#{ code }" autofocus readonly>
					"""
			closable: true
			class: 'login'
			buttons:
				cancel:
					title: ''
					fn: -> basicModal.close true
				action:
					title: 'Done'
					color: 'normal'
					fn: -> basicModal.close(true)

	help: ->

		window.location.href = ackee.settings.github
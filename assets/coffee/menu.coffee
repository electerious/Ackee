this.menu =

	_button: null
	_items: [
		{ type: 'item', title: 'Add Sites', icon: 'ion-plus-round', fn: -> settings.addSites() }
		{ type: 'item', title: 'Reset Login', icon: 'ion-person', fn: -> login.reset() }
		{ type: 'item', title: 'Help', icon: 'ion-help-buoy', fn: -> settings.help() }
		{ type: 'item', title: 'Logout', icon: 'ion-log-out', fn: -> ackee.logout() }
	]

	init: (button) ->

		return false if not button?

		menu._button = button

		# Bind buttons
		$(menu._button).click menu._show

		# Bind hotkeys
		Mousetrap.bind 'ctrl+a', settings.addSites
		Mousetrap.bind 'ctrl+l', ackee.logout

		# Show button
		$(menu._button).addClass 'fadeIn'

		return true

	_show: (e) ->

		basicContext.show menu._items, e
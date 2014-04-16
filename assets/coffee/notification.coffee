this.notification =

	_data: []

	_valid: (data) ->

		if	data?.icon? and
			data.text?

				return true

		return false

	_build: (data) ->

		"""
		<div class='notification fadeIn' data-id='#{ new Date().getTime() }'>
			<a class='ion-#{ data.icon }'></a>
			<p>#{ data.text }</p>
		</div>
		"""

	_setOffset: (decrease) ->


		if notification._data.length isnt 0

			# For each notification do ...
			notification._data.forEach (id, index, array) ->

				element	= $(".notification[data-id='#{ id }']")
				height	= parseInt(element.css('top')) + element.outerHeight()

				offset	= height * (index+1) if decrease is false
				offset	= height * index if decrease is true

				# Set new offset
				element.css '-webkit-transform', "translateY(#{ offset }px)"
				element.css '-mz-transform', "translateY(#{ offset }px)"
				element.css 'transform', "translateY(#{ offset }px)"

	show: (data) ->

		return false if not data? or not notification._valid data

		# Recalculate offset
		notification._setOffset false

		# Build
		html	= notification._build data
		id		= $(html).data('id')

		# Add
		notification._data.unshift id
		$('body').append html

		# Remove after click
		$(".notification[data-id='#{ id }']").click ->
			notification.close id, true

		# Remove after timeout
		if not data.pin? or (data.pin? and data.pin is false)
			setTimeout ->
				notification.close id
			, 5000

		return id

	close: (id, force) ->

		element			= $(".notification[data-id='#{ id }']")
		elementIndex	= notification._data.indexOf id

		if $(".notification[data-id='#{ id }']:hover").length isnt 0 and force isnt true
			# Close later
			setTimeout ->
				notification.close id
			, 500
			return false

		# Fade out and remove
		element.removeClass('fadeIn').addClass('fadeOut')
		setTimeout ->
			element.remove()
			notification._data.splice elementIndex, 1
			notification._setOffset true
			return true
		, 300
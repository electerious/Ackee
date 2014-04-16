this.modal =

	_valid: (data) ->

		if	data?.body? and
			data?.closable? and
			data.buttons?.cancel?.title? and
			data.buttons?.action?.title? and
			data.buttons.cancel.fn and
			data.buttons.action.fn

				data.class = '' if not data.class?

				return true

		return false

	_build: (data) ->

		"""
		<div class='modalContainer fadeIn' data-closable='#{ data.closable }'>
			<div class='modal fadeIn #{ data.class }'>
				#{ data.body }
				<a id='cancel' class='button'>#{ data.buttons.cancel.title }</a>
				<a id='action' class='button #{ data.buttons.action.color }'><span class='ion-#{ data.buttons.action.icon }'></span>#{ data.buttons.action.title }</a>
			</div>
		</div>
		"""

	_getValues: ->

		values = null

		if $(".modalContainer input").length isnt 0

			values = {}
			$(".modalContainer input").each ->
				name	= $(this).data('name')
				value	= $(this).val()
				values[name] = value

		return values

	show: (data) ->

		# Validate data
		return false if not data? or not modal._valid data

		# Remove open modal
		if $(".modalContainer").length isnt 0
			modal.close true
			setTimeout ->
				modal.show data
			, 300
			return false

		# Build and append
		$('body').append modal._build(data)

		# Bind buttons
		$('.modalContainer #cancel').click data.buttons.cancel.fn
		$('.modalContainer #action').click -> data.buttons.action.fn modal._getValues()
		$('.modalContainer input').keydown -> $(this).removeClass 'error'

		return true

	error: (input) ->

		# Reactive button
		$('.modalContainer #action').removeClass 'active'

		# Remove old error
		$('.modalContainer input').removeClass 'error'

		# Focus input
		$(".modalContainer input[data-name='#{ input }']")
			.addClass 'error'
			.focus().select()

		# Shake
		$('.modalContainer .modal').removeClass 'fadeIn shake'
		setTimeout ->
			$('.modalContainer .modal').addClass 'shake'
		, 1

	close: (force) ->

		###
		Close modal if force is not set or true,
		or mouse is not over modal.
		###
		if	not force? or
			force is true

				# Don't close when not closable
				return false if $('.modalContainer[data-closable=true]').length is 0 and force isnt true

				$('.modalContainer').removeClass('fadeIn').addClass('fadeOut')
				setTimeout ->
					$(".modalContainer").remove()
					return true
				, 300

				return true

		return false
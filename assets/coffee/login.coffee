this.login =

	_try: (data) ->

		# Save username
		localStorage.setItem 'username', data.username

		url = 'api/session/login?' + ackee.serialize(data)
		ackee.api url, (data) ->

			if data is true

				# Login valid
				basicModal.close true
				ackee.init()
				return true

			# Login failed
			basicModal.error 'password'
			return false

	show: (data) ->

		basicModal.show
			body:	"""
					<h1>#{ data.name }</h1>
					<h2>Version #{ data.version } – Web analytics done right!</h2>
					<input class="text" type="text" placeholder="username" data-name="username">
					<input class="text" type="password" placeholder="password" data-name="password">
					"""
			closable: false
			class: 'login'
			buttons:
				action:
					title: 'Sign in and continue'
					fn: login._try

		if	localStorage?.getItem('username')?.length > 0

			$('input[data-name="username"]').val localStorage.getItem('username')
			$('input[data-name="password"]').focus()

	set: ->

		steps = [

			# Enter login
			->

				basicModal.show
					body:	"""
							<h1>Welcome</h1>
							<p>Hi there, lets create your login!</p>
							<input class="text" type="text" placeholder="username" data-name="username" autofocus>
							<input class="text" type="password" placeholder="password" data-name="password">
							<input class="text" type="password" placeholder="repeat password" data-name="repassword">
							"""
					closable: false
					class: 'login'
					buttons:
						action:
							title: 'Create login and continue'
							fn: steps[1]

			# Save login
			(data) ->

				if	not data?.username? or
					data.username is ''

						# Invalid username
						basicModal.error 'username'
						return false

				if	not data?.password? or
					data.password is ''

						# Invalid password
						basicModal.error 'password'
						return false

				if	not data?.repassword? or
					data.repassword is ''

						# Invalid repassword
						basicModal.error 'repassword'
						return false

				if	data.password isnt data.repassword

						# Invalid password and repassword
						basicModal.error 'repassword'
						$('.basicModalContainer input[data-name="password"]').addClass 'error'
						return false

				# Save username
				localStorage.setItem 'username', data.username

				# Removed unused var
				delete data.repassword

				url = 'api/login/set?' + ackee.serialize(data)
				ackee.api url, (_data) ->

					if _data is true

						# Success
						basicModal.close true
						ackee.init()
						return true

					else

						# Unknown error
						basicModal.reset()
						return false

		]

		steps[0]()

	reset: ->

		steps = [

			->

				basicModal.show
					body:	"""
							<p>This step will reset your username and password, allowing you to change your login. Are your sure?</p>
							"""
					buttons:
						cancel:
							title: 'Cancel'
							fn: -> basicModal.close()
						action:
							title: 'Reset login'
							fn: steps[1]

			->

				basicModal.show
					body:	"""
							<h1>Verify</h1>
							<p>Enter your current passwort below to verify your identity:</p>
							<input class="text" type="password" placeholder="password" data-name="password" autofocus>
							"""
					closable: true
					class: 'login'
					buttons:
						cancel:
							title: ''
							fn: -> basicModal.close()
						action:
							title: 'Verify and reset login'
							fn: steps[2]

			(data) ->

				# Validate password
				if	not data?.password? or
					data.password is ''

						# Invalid password
						basicModal.error 'password'
						return false

				# Add username
				data.username = ackee.settings.init.username || ''

				url = 'api/login/reset?' + ackee.serialize(data)
				ackee.api url, (_data) ->

					# Reload
					if _data is true
						window.location.reload()
						return true

					# Error
					basicModal.error 'password'
					return false

		]

		steps[0](1)

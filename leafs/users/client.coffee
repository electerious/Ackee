leafs.add leafs.users =

	title: 'Users'
	theme: 'dark'

	init: ->

		cache.urls.push 'api/get/users/browsers',
						'api/get/users/platform',
						'api/get/users/screens',
						'api/get/users/duration',
						'api/get/users/languages'

		leafs.users.switch.init()

		switch localStorage.getItem 'leafs_users_selection'

			when 'browsers', null	then leafs.users.load 'browsers'
			when 'platform'			then leafs.users.load 'platform'
			when 'screens'			then leafs.users.load 'screens'
			when 'duration'			then leafs.users.load 'duration'
			when 'languages'			then leafs.users.load 'languages'

	load: (mode) ->

		leafs.users.switch.close()

		if	localStorage.getItem('leafs_users_selection') is mode and
			leafs.users.dom().find('.content').html()?

				return false

		localStorage.setItem 'leafs_users_selection', mode
		leafs.users.dom().find('.content').remove()

		ackee.api 'api/get/users/' + mode, (data) ->

			html	= leafs.users.build.content mode, data
			title	= mode.charAt(0).toUpperCase() + mode.slice(1)

			leafs.users.dom().append html
			leafs.users.dom().find('.switch span').html title

			Sortable.init()

	switch:

		init: ->

			data = [
				{ type: 'item', title: 'Browsers', icon: 'ion-compass', fn: -> leafs.users.load 'browsers' }
				{ type: 'item', title: 'Platform', icon: 'ion-android-storage', fn: -> leafs.users.load 'platform' }
				{ type: 'item', title: 'Screens', icon: 'ion-monitor', fn: -> leafs.users.load 'screens' }
				{ type: 'item', title: 'Duration', icon: 'ion-android-clock', fn: -> leafs.users.load 'duration' }
				{ type: 'item', title: 'Languages', icon: 'ion-chatbox', fn: -> leafs.users.load 'languages' }
			]

			leafs.users.dom().find('.switch').click (e) ->
				$(this).addClass 'active'
				basicContext.show data, e, leafs.users.switch.close

		close: ->

			leafs.users.dom().find('.switch').removeClass 'active'
			basicContext.close()

	build:

		empty: ->

			"""
			<div class='content empty'>
				<p>
					No users available<br>
					<a onClick='window.settings.addSites()'>Add Ackee to your site &#187;</a>
				</p>
			</div>
			"""

		content: (mode, data) ->

			# No data
			return leafs.users.build.empty() if data.length is 0

			# Function for each row
			switch mode

				when 'browsers'

					title = 'Browser'

					item = (row) ->

						return '' if not row?

						row.percent_text = if row.percent<2 then '&#8764;1' else row.percent

						"""
						<tr>
							<td data-value='#{ row.percent }' title='#{ row.users } users'>#{ row.percent_text }%</td>
							<td>#{ row.browser }</td>
						</tr>
						"""

				when 'platform'

					title = 'Platform'

					item = (row) ->

						return '' if not row?

						row.percent_text = if row.percent<2 then '&#8764;1' else row.percent

						"""
						<tr>
							<td data-value='#{ row.percent }' title='#{ row.users } users'>#{ row.percent_text }%</td>
							<td>#{ row.platform }</td>
						</tr>
						"""

				when 'screens'

					title = 'Resolution'

					item = (row) ->

						return '' if not row?

						row.percent_text = if row.percent<2 then '&#8764;1' else row.percent

						"""
						<tr>
							<td data-value='#{ row.percent }' title='#{ row.users } users'>#{ row.percent_text }%</td>
							<td data-value='#{ row.pixels }'>#{ row.resolution }</td>
						</tr>
						"""

				when 'duration'

					title = 'Duration'

					item = (row) ->

						return '' if not row?

						row.percent_text = if row.percent<2 then '&#8764;1' else row.percent
						row.duration = if row.duration is 0 then '< 10' else row.duration

						"""
						<tr>
							<td data-value='#{ row.percent }' title='#{ row.users } users'>#{ row.percent_text }%</td>
							<td>#{ row.duration } sec</td>
						</tr>
						"""

				when 'languages'

					title = 'Language'

					item = (row) ->

						return '' if not row?

						row.percent_text = if row.percent<2 then '&#8764;1' else row.percent

						"""
						<tr>
							<td data-value='#{ row.percent }' title='#{ row.users } users'>#{ row.percent_text }%</td>
							<td>#{ row.language }</td>
						</tr>
						"""

			# Build table
			"""
			<div class='content table #{ mode }'>
				<table data-sortable>
					<thead>
						<tr>
							<th data-sorted='true' data-sorted-direction='descending'>Users</th>
							<th>#{ title }</th>
						</tr>
					</thead>
					<tbody>
						#{ (item row for row in data).join '' }
					</tbody>
				</table>
			</div>
			"""

leafs.add leafs.pages =

	title: 'Pages'
	theme: 'dark'

	init: ->

		cache.urls.push 'api/get/pages/popular',
						'api/get/pages/recent'

		leafs.pages.switch.init()

		switch localStorage.getItem 'leafs_pages_selection'

			when 'popular', null	then leafs.pages.load 'popular'
			when 'recent'			then leafs.pages.load 'recent'

	load: (mode) ->

		leafs.pages.switch.close()

		if	localStorage.getItem('leafs_pages_selection') is mode and
			leafs.pages.dom().find('.content').html()?

				return false

		localStorage.setItem 'leafs_pages_selection', mode
		leafs.pages.dom().find('.content').remove()

		ackee.api 'api/get/pages/' + mode, (data) ->

			html	= leafs.pages.build[mode] data
			title	= mode.charAt(0).toUpperCase() + mode.slice(1)

			leafs.pages.dom().append html
			leafs.pages.dom().find('.switch span').html title

			Sortable.init()

	switch:

		init: ->

			data = [
				{ type: 'item', title: 'Popular', icon: 'ion-arrow-graph-up-right', fn: -> leafs.pages.load 'popular' }
				{ type: 'item', title: 'Recent', icon: 'ion-android-clock', fn: -> leafs.pages.load 'recent' }
			]

			leafs.pages.dom().find('.switch').click (e) ->
				$(this).addClass 'active'
				basicContext.show data, e, leafs.pages.switch.close

		close: ->

			leafs.pages.dom().find('.switch').removeClass 'active'
			basicContext.close()

	build:

		empty: ->

			"""
			<div class='content empty'>
				<p>
					No pages available<br>
					<a onClick='window.settings.addSites()'>Add Ackee to your site &#187;</a>
				</p>
			</div>
			"""

		popular: (data) ->

			# No data
			return leafs.pages.build.empty() if data.length is 0

			# Function for each row
			item = (row) ->

				return '' if not row?

				row.time_text = prettyDate(new Date(row.time*1000).toISOString().replace '.000', '')

				"""
				<tr>
					<td>#{ row.visits }</td>
					<td><a href='#{ row.site }'>#{ row.site_title }</a></td>
					<td class='time' data-value='#{ row.time }'>#{ row.time_text }</td>
				</tr>
				"""

			# Build table
			"""
			<div class='content table popular'>
				<table data-sortable>
					<thead>
						<tr>
							<th data-sorted='true' data-sorted-direction='descending'>Visits</th>
							<th>Page</th>
							<th>Last Visit</th>
						</tr>
					</thead>
				    <tbody>
						#{ (item row for row in data).join '' }
				    </tbody>
				</table>
			</div>
			"""

		recent: (data) ->

			# No data
			return leafs.pages.build.empty() if data.length is 0

			# Function for each row
			item = (row) ->

				return '' if not row?

				row.time_text = prettyDate(new Date(row.time*1000).toISOString().replace '.000', '')

				"""
				<tr>
					<td><a href='#{ row.site }'>#{ row.site_title }</a></td>
					<td class='time' data-value='#{ row.time }'>#{ row.time_text }</td>
				</tr>
				"""

			# Build table
			"""
			<div class='content table recent'>
				<table data-sortable>
					<thead>
						<tr>
							<th>Page</th>
							<th data-sorted='true' data-sorted-direction='descending'>Time</th>
						</tr>
					</thead>
				    <tbody>
						#{ (item row for row in data).join '' }
				    </tbody>
				</table>
			</div>
			"""
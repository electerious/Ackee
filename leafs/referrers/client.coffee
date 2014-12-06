leafs.add leafs.referrers =

	title: 'Referrers'
	theme: 'dark'

	init: ->

		cache.urls.push 'api/get/referrers/recent',
						'api/get/referrers/repeating'

		leafs.referrers.switch.init()

		switch localStorage.getItem 'leafs_referrers_selection'

			when 'recent', null	then leafs.referrers.load 'recent'
			when 'repeating'	then leafs.referrers.load 'repeating'

	load: (mode) ->

		leafs.referrers.switch.close()

		if	localStorage.getItem('leafs_referrers_selection') is mode and
			leafs.referrers.dom().find('.content').html()?

				return false

		localStorage.setItem 'leafs_referrers_selection', mode
		leafs.referrers.dom().find('.content').remove()

		ackee.api 'api/get/referrers/' + mode, (data) ->

			html	= leafs.referrers.build[mode] data
			title	= mode.charAt(0).toUpperCase() + mode.slice(1)

			leafs.referrers.dom().append html
			leafs.referrers.dom().find('.switch span').html title

			leafs.referrers.dom().find('img.favicon').error ->
				host		= $(this).data('host')
				blacklist	= localStorage.getItem('leafs_referrers_blacklist')?.split(',') || []
				blacklist.push host if blacklist.indexOf(host) is -1
				localStorage.setItem 'leafs_referrers_blacklist', blacklist
				$(this).attr 'src', 'assets/img/link.ico'

			Sortable.init()

	switch:

		init: ->

			data = [
				{ type: 'item', title: 'Recent', icon: 'ion-android-clock', fn: -> leafs.referrers.load 'recent' }
				{ type: 'item', title: 'Repeating', icon: 'ion-refresh', fn: -> leafs.referrers.load 'repeating' }
			]

			leafs.referrers.dom().find('.switch').click (e) ->
				$(this).addClass 'active'
				basicContext.show data, e, leafs.referrers.switch.close

		close: ->

			leafs.referrers.dom().find('.switch').removeClass 'active'
			basicContext.close()

	build:

		empty: ->

			"""
			<div class='content empty'>
				<p>
					No referrers available<br>
					<a onClick='window.settings.addSites()'>Add Ackee to your site &#187;</a>
				</p>
			</div>
			"""

		recent: (data) ->

			# No data
			return leafs.referrers.build.empty() if data.length is 0

			# Load blacklist
			blacklist = localStorage.getItem('leafs_referrers_blacklist') || ''

			# Function for each row
			item = (row) ->

				return '' if not row?

				row.time_text	= prettyDate(new Date(row.time*1000).toISOString().replace '.000', '')
				row.favicon		= if blacklist.indexOf(row.referrer.host) is -1 then "//#{ row.referrer.host }/favicon.ico" else 'assets/img/link.ico'

				"""
				<tr>
					<td>
						<img src="#{ row.favicon }" data-host="#{ row.referrer.host }" width="16" height="16" class="favicon">
						<a href='#{ row.referrer.href }'>#{ row.referrer.host }<span>#{ row.referrer.path }</span></a>
						<p>&#8627; <a href='#{ row.site }'>#{ row.site_title }</a></p>
					</td>
					<td class='time' data-value='#{ row.time }'>#{ row.time_text }</td>
				</tr>
				"""

			# Build table
			"""
			<div class='content table recent'>
				<table data-sortable>
					<thead>
						<tr>
							<th>From</th>
							<th data-sorted='true' data-sorted-direction='descending'>Time</th>
						</tr>
					</thead>
					<tbody>
						#{ (item row for row in data).join '' }
					</tbody>
				</table>
			</div>
			"""

		repeating: (data) ->

			# No data
			return leafs.referrers.build.empty() if data.length is 0

			# Load blacklist
			blacklist = localStorage.getItem('leafs_referrers_blacklist') || ''

			# Function for each row
			item = (row) ->

				return '' if not row?

				row.favicon = if blacklist.indexOf(row.referrer.host) is -1 then "//#{ row.referrer.host }/favicon.ico" else ''

				"""
				<tr>
					<td>
						<img src="#{ row.favicon }" data-host="#{ row.referrer.host }" width="16" height="16" class="favicon">
						<a href='#{ row.referrer.href }'>#{ row.referrer.host }<span>#{ row.referrer.path }</span></a>
					</td>
					<td>
						#{ row.visits }
					</td>
				</tr>
				"""

			# Build table
			"""
			<div class='content table repeating'>
				<table data-sortable>
					<thead>
						<tr>
							<th>From</th>
							<th data-sorted='true' data-sorted-direction='descending'>Visits</th>
						</tr>
					</thead>
					<tbody>
						#{ (item row for row in data).join '' }
					</tbody>
				</table>
			</div>
			"""

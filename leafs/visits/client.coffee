leafs.add leafs.visits =

	title: 'Visits'
	theme: 'light'

	init: ->

		cache.urls.push	'api/get/visits/hour',
						'api/get/visits/week',
						'api/get/visits/month'

		leafs.visits.switch.init()

		switch localStorage.getItem 'leafs_visits_selection'

			when 'hour'			then leafs.visits.load 'hour'
			when 'week', null	then leafs.visits.load 'week'
			when 'month'		then leafs.visits.load 'month'

	load: (mode) ->

		leafs.visits.switch.close()

		if	localStorage.getItem('leafs_visits_selection') is mode and
			leafs.visits.dom().find('.content').html()?

				return false

		localStorage.setItem 'leafs_visits_selection', mode
		leafs.visits.dom().find('.content').remove()

		ackee.api 'api/get/visits/' + mode, (data) ->

			html	= leafs.visits.build.content data
			title	= mode.charAt(0).toUpperCase() + mode.slice(1)

			leafs.visits.dom().append html
			leafs.visits.dom().find('.switch span').html title

	switch:

		init: ->

			data = [
				{ type: 'item', title: 'Hours', icon: 'ion-android-data', fn: -> leafs.visits.load 'hour' }
				{ type: 'item', title: 'Week', icon: 'ion-android-clock', fn: -> leafs.visits.load 'week' }
				{ type: 'item', title: 'Months', icon: 'ion-calendar', fn: -> leafs.visits.load 'month' }
			]

			leafs.visits.dom().find('.switch').click (e) ->
				$(this).addClass 'active'
				basicContext.show data, e, leafs.visits.switch.close

		close: ->

			leafs.visits.dom().find('.switch').removeClass 'active'
			basicContext.close()

	build:

		empty: ->

			"""
			<div class='content empty'>
				<p>
					No visits available<br>
					<a onClick='window.settings.addSites()'>Add Ackee to your site &#187;</a>
				</p>
			</div>
			"""

		content: (data) ->

			# No data
			return leafs.visits.build.empty() if data.rows.length is 0

			# Build stats
			"""
			<div class="content bars">
				<div class="columns">
					<h2>#{ data.highest.s4 }</h2>
					<h2>#{ data.highest.s3 }</h2>
					<h2>#{ data.highest.s2 }</h2>
					<h2>#{ data.highest.s1 }</h2>
					<h2>0</h2>
				</div>
				#{ (leafs.visits.build.bar row, data.highest.s1 for row in data.rows).join '' }
			</div>
			"""

		bar: (row, step) ->

			return '' if not row?

			row.height = (77/step)*row.count

			"""
			<div class="row">
				<h2 title="#{ row.title.full }">#{ row.title.short }</h2>
				<div class="bar" style="margin-top: calc(389px - #{ row.height }px);">
					<div class="inner"></div>
					<h3 data-typ="unique">#{ row.count }</h3>
				</div>
			</div>
			"""
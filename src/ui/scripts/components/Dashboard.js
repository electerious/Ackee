import { createElement as h, useEffect } from 'react'

import * as route from '../constants/route'
import routeByKey from '../utils/routeByKey'

import Header, { createButton, createDropdown, createDropdownButton, createDropdownSeparator } from './Header'
import Modals from './Modals'

const Dashboard = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	const domainsLabel = (activeInside) => activeInside === true ? props.route.params.domain.data.title : route.ROUTE_DOMAIN.name
	const insightsLabel = (activeInside) => activeInside === true ? routeByKey(props.route.key).name : 'Insights'

	return (
		h('div', {},
			h(Modals, props),
			h(Header, {
				fetching: props.fetching,
				items: [
					createButton(route.ROUTE_OVERVIEW.name, route.ROUTE_OVERVIEW, props),
					createDropdown(domainsLabel, props.domains.value.map((domain) =>
						createDropdownButton(domain.data.title, { ...route.ROUTE_DOMAIN, params: { domain } }, props)
					)),
					createDropdown(insightsLabel, [
						createDropdownButton(route.ROUTE_VIEWS.name, route.ROUTE_VIEWS, props),
						createDropdownButton(route.ROUTE_PAGES.name, route.ROUTE_PAGES, props),
						createDropdownButton(route.ROUTE_REFERRERS.name, route.ROUTE_REFERRERS, props),
						createDropdownButton(route.ROUTE_DURATIONS.name, route.ROUTE_DURATIONS, props),
						createDropdownSeparator(),
						createDropdownButton(route.ROUTE_SYSTEMS.name, route.ROUTE_SYSTEMS, props),
						createDropdownButton(route.ROUTE_DEVICES.name, route.ROUTE_DEVICES, props),
						createDropdownButton(route.ROUTE_BROWSERS.name, route.ROUTE_BROWSERS, props),
						createDropdownButton(route.ROUTE_SIZES.name, route.ROUTE_SIZES, props),
						createDropdownButton(route.ROUTE_LANGUAGES.name, route.ROUTE_LANGUAGES, props)
					]),
					createButton(route.ROUTE_SETTINGS.name, route.ROUTE_SETTINGS, props)
				]
			}),
			h('main', { className: 'content' },
				h(routeByKey(props.route.key).component, props)
			)
		)
	)

}

export default Dashboard
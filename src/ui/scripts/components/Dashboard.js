import { createElement as h, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import * as route from '../constants/route'
import * as selectDomainsValue from '../selectors/selectDomainsValue'
import routeByKey from '../utils/routeByKey'
import whenBelow from '../utils/whenBelow'
import overviewRoute from '../utils/overviewRoute'

import Header, { createButton, createDropdown, createDropdownButton, createDropdownSeparator } from './Header'
import Modals from './Modals'

const gotoDomainWhenAvailable = (props, index) => {

	const domain = selectDomainsValue.byIndex(props, index)
	if (domain != null) props.setRoute(overviewRoute(domain))

}

const Dashboard = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	const domainsLabel = (activeInside) => activeInside === true ? selectDomainsValue.byId(props, props.route.params.domainId).data.title : 'Domains'
	const insightsLabel = (activeInside) => activeInside === true ? routeByKey(props.route.key).title : 'Insights'

	useHotkeys('o', () => props.setRoute(route.ROUTE_OVERVIEW))

	useHotkeys('v', () => props.setRoute(route.ROUTE_VIEWS))
	useHotkeys('p', () => props.setRoute(route.ROUTE_PAGES))
	useHotkeys('r', () => props.setRoute(route.ROUTE_REFERRERS))
	useHotkeys('d', () => props.setRoute(route.ROUTE_DURATIONS))

	useHotkeys('0', () => gotoDomainWhenAvailable(props, 0), [ props ])
	useHotkeys('1', () => gotoDomainWhenAvailable(props, 1), [ props ])
	useHotkeys('2', () => gotoDomainWhenAvailable(props, 2), [ props ])
	useHotkeys('3', () => gotoDomainWhenAvailable(props, 3), [ props ])
	useHotkeys('4', () => gotoDomainWhenAvailable(props, 4), [ props ])
	useHotkeys('5', () => gotoDomainWhenAvailable(props, 5), [ props ])
	useHotkeys('6', () => gotoDomainWhenAvailable(props, 6), [ props ])
	useHotkeys('7', () => gotoDomainWhenAvailable(props, 7), [ props ])
	useHotkeys('8', () => gotoDomainWhenAvailable(props, 8), [ props ])
	useHotkeys('9', () => gotoDomainWhenAvailable(props, 9), [ props ])

	return (
		h('div', {},
			h(Modals, props),
			h(Header, {
				fetching: props.fetching,
				items: [
					createButton(route.ROUTE_OVERVIEW.title, route.ROUTE_OVERVIEW, props),
					createDropdown(domainsLabel, props.domains.value.map((domain, index) =>
						createDropdownButton(domain.data.title, overviewRoute(domain), props, whenBelow(index, 10))
					)),
					createDropdown(insightsLabel, [
						createDropdownButton(route.ROUTE_VIEWS.title, route.ROUTE_VIEWS, props, 'v'),
						createDropdownButton(route.ROUTE_PAGES.title, route.ROUTE_PAGES, props, 'p'),
						createDropdownButton(route.ROUTE_REFERRERS.title, route.ROUTE_REFERRERS, props, 'r'),
						createDropdownButton(route.ROUTE_DURATIONS.title, route.ROUTE_DURATIONS, props, 'd'),
						createDropdownSeparator(),
						createDropdownButton(route.ROUTE_SYSTEMS.title, route.ROUTE_SYSTEMS, props),
						createDropdownButton(route.ROUTE_DEVICES.title, route.ROUTE_DEVICES, props),
						createDropdownButton(route.ROUTE_BROWSERS.title, route.ROUTE_BROWSERS, props),
						createDropdownButton(route.ROUTE_SIZES.title, route.ROUTE_SIZES, props),
						createDropdownButton(route.ROUTE_LANGUAGES.title, route.ROUTE_LANGUAGES, props)
					]),
					createButton(route.ROUTE_SETTINGS.title, route.ROUTE_SETTINGS, props)
				]
			}),
			h('main', { className: 'content' },
				h(routeByKey(props.route.key).component, props)
			)
		)
	)

}

export default Dashboard
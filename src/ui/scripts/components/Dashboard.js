import { createElement as h, useEffect } from 'react'

import * as route from '../constants/route'

import Header, { createButton, createDropdown, createDropdownButton, createDropdownSeparator } from './Header'
import RouteOverview from './routes/RouteOverview'
import RouteDomain from './routes/RouteDomain'
import RouteViews from './routes/RouteViews'
import RoutePages from './routes/RoutePages'
import RouteReferrers from './routes/RouteReferrers'
import RouteDurations from './routes/RouteDurations'
import RouteBrowsers from './routes/RouteBrowsers'
import RouteDevices from './routes/RouteDevices'
import RouteLanguages from './routes/RouteLanguages'
import RouteSystems from './routes/RouteSystems'
import RouteSizes from './routes/RouteSizes'
import RouteSettings from './routes/RouteSettings'
import Modals from './Modals'

import selectRouteKey from '../selectors/selectRouteKey'

const routesMap = {
	[route.ROUTE_OVERVIEW.key]: RouteOverview,
	[route.ROUTE_DOMAIN.key]: RouteDomain,
	[route.ROUTE_VIEWS.key]: RouteViews,
	[route.ROUTE_PAGES.key]: RoutePages,
	[route.ROUTE_REFERRERS.key]: RouteReferrers,
	[route.ROUTE_DURATIONS.key]: RouteDurations,
	[route.ROUTE_SYSTEMS.key]: RouteSystems,
	[route.ROUTE_DEVICES.key]: RouteDevices,
	[route.ROUTE_BROWSERS.key]: RouteBrowsers,
	[route.ROUTE_SIZES.key]: RouteSizes,
	[route.ROUTE_LANGUAGES.key]: RouteLanguages,
	[route.ROUTE_SETTINGS.key]: RouteSettings
}

const Dashboard = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	return (
		h('div', {},
			h(Modals, props),
			h(Header, {
				fetching: props.fetching,
				items: [
					createButton('Overview', route.ROUTE_OVERVIEW, props),
					createDropdown('Domains', props.domains.value.map((domain) =>
						createDropdownButton(domain.data.title, { ...route.ROUTE_DOMAIN, params: { domain } }, props)
					)),
					createDropdown('Insights', [
						createDropdownButton('Views', route.ROUTE_VIEWS, props),
						createDropdownButton('Pages', route.ROUTE_PAGES, props),
						createDropdownButton('Referrers', route.ROUTE_REFERRERS, props),
						createDropdownButton('Durations', route.ROUTE_DURATIONS, props),
						createDropdownSeparator(),
						createDropdownButton('Systems', route.ROUTE_SYSTEMS, props),
						createDropdownButton('Devices', route.ROUTE_DEVICES, props),
						createDropdownButton('Browsers', route.ROUTE_BROWSERS, props),
						createDropdownButton('Sizes', route.ROUTE_SIZES, props),
						createDropdownButton('Languages', route.ROUTE_LANGUAGES, props)
					]),
					createButton('Settings', route.ROUTE_SETTINGS, props)
				]
			}),
			h('main', { className: 'content' },
				h(routesMap[selectRouteKey(props)], props)
			)
		)
	)

}

export default Dashboard
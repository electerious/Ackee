import { createElement as h, useEffect } from 'react'

import {
	ROUTE_OVERVIEW,
	ROUTE_DOMAIN,
	ROUTE_VIEWS,
	ROUTE_PAGES,
	ROUTE_REFERRERS,
	ROUTE_DURATIONS,
	ROUTE_LANGUAGES,
	ROUTE_SIZES,
	ROUTE_SYSTEMS,
	ROUTE_SETTINGS,
	ROUTE_DEVICES,
	ROUTE_BROWSERS
} from '../constants/route'

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
	[ROUTE_OVERVIEW.key]: RouteOverview,
	[ROUTE_DOMAIN.key]: RouteDomain,
	[ROUTE_VIEWS.key]: RouteViews,
	[ROUTE_PAGES.key]: RoutePages,
	[ROUTE_REFERRERS.key]: RouteReferrers,
	[ROUTE_DURATIONS.key]: RouteDurations,
	[ROUTE_SYSTEMS.key]: RouteSystems,
	[ROUTE_DEVICES.key]: RouteDevices,
	[ROUTE_BROWSERS.key]: RouteBrowsers,
	[ROUTE_SIZES.key]: RouteSizes,
	[ROUTE_LANGUAGES.key]: RouteLanguages,
	[ROUTE_SETTINGS.key]: RouteSettings
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
					createButton('Overview', ROUTE_OVERVIEW, props),
					createDropdown('Domains', props.domains.value.map((domain) =>
						createDropdownButton(domain.data.title, { ...ROUTE_DOMAIN, params: { domain } }, props)
					)),
					createDropdown('Insights', [
						createDropdownButton('Views', ROUTE_VIEWS, props),
						createDropdownButton('Pages', ROUTE_PAGES, props),
						createDropdownButton('Referrers', ROUTE_REFERRERS, props),
						createDropdownButton('Durations', ROUTE_DURATIONS, props),
						createDropdownSeparator(),
						createDropdownButton('Systems', ROUTE_SYSTEMS, props),
						createDropdownButton('Devices', ROUTE_DEVICES, props),
						createDropdownButton('Browsers', ROUTE_BROWSERS, props),
						createDropdownButton('Sizes', ROUTE_SIZES, props),
						createDropdownButton('Languages', ROUTE_LANGUAGES, props)
					]),
					createButton('Settings', ROUTE_SETTINGS, props)
				]
			}),
			h('main', { className: 'content' },
				h(routesMap[selectRouteKey(props)], props)
			)
		)
	)

}

export default Dashboard
import { createElement as h } from 'react'

import {
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

import Header, { createButton, createDropdown, createDropdownButton } from './Header'
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

const routesMap = {
	[ROUTE_VIEWS]: RouteViews,
	[ROUTE_PAGES]: RoutePages,
	[ROUTE_REFERRERS]: RouteReferrers,
	[ROUTE_DURATIONS]: RouteDurations,
	[ROUTE_SYSTEMS]: RouteSystems,
	[ROUTE_DEVICES]: RouteDevices,
	[ROUTE_BROWSERS]: RouteBrowsers,
	[ROUTE_SIZES]: RouteSizes,
	[ROUTE_LANGUAGES]: RouteLanguages,
	[ROUTE_SETTINGS]: RouteSettings
}

const Dashboard = (props) => {

	return (
		h('div', {},
			h(Modals, props),
			h(Header, {
				fetching: props.fetching,
				items: [
					createButton('Views', ROUTE_VIEWS, props),
					createButton('Pages', ROUTE_PAGES, props),
					createButton('Referrers', ROUTE_REFERRERS, props),
					createButton('Durations', ROUTE_DURATIONS, props),
					createDropdown('Detailed', [
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
				h(routesMap[props.route.value], props)
			)
		)
	)

}

export default Dashboard
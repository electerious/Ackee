import { createElement as h } from 'react'

import {
	ROUTE_VIEWS,
	ROUTE_PAGES,
	ROUTE_REFERRERS,
	ROUTE_DURATIONS,
	ROUTE_LANGUAGES,
	ROUTE_SIZES,
	ROUTE_OS,
	ROUTE_SETTINGS,
	ROUTE_DEVICES,
	ROUTE_BROWSERS
} from '../constants/route'

import Header, { createButton, createDropdown } from './Header'
import RouteViews from './routes/RouteViews'
import RoutePages from './routes/RoutePages'
import RouteReferrers from './routes/RouteReferrers'
import RouteDurations from './routes/RouteDurations'
import RouteBrowsers from './routes/RouteBrowsers'
import RouteDevices from './routes/RouteDevices'
import RouteLanguages from './routes/RouteLanguages'
import RouteOs from './routes/RouteOs'
import RouteSizes from './routes/RouteSizes'
import RouteSettings from './routes/RouteSettings'
import Modals from './Modals'

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
						createButton('Browsers', ROUTE_BROWSERS, props),
						createButton('Devices', ROUTE_DEVICES, props),
						createButton('Languages', ROUTE_LANGUAGES, props),
						createButton('Os', ROUTE_OS, props),
						createButton('Sizes', ROUTE_SIZES, props)
					]),
					createButton('Settings', ROUTE_SETTINGS, props)
				]
			}),
			h('main', { className: 'content' },
				props.route.value === ROUTE_VIEWS && h(RouteViews, props),
				props.route.value === ROUTE_PAGES && h(RoutePages, props),
				props.route.value === ROUTE_REFERRERS && h(RouteReferrers, props),
				props.route.value === ROUTE_DURATIONS && h(RouteDurations, props),
				props.route.value === ROUTE_BROWSERS && h(RouteBrowsers, props),
				props.route.value === ROUTE_DEVICES && h(RouteDevices, props),
				props.route.value === ROUTE_LANGUAGES && h(RouteLanguages, props),
				props.route.value === ROUTE_SIZES && h(RouteSizes, props),
				props.route.value === ROUTE_OS && h(RouteOs, props),
				props.route.value === ROUTE_SETTINGS && h(RouteSettings, props)
			)
		)
	)

}

export default Dashboard
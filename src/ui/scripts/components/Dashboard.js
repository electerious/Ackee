import { createElement as h, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import whenBelow from '../utils/whenBelow'
import * as routes from '../constants/routes'
import useRoute from '../hooks/useRoute'

import Header, { createButton, createDropdown, createDropdownButton, createDropdownSeparator } from './Header'
import Modals from './Modals'

import RouteOverview from './routes/RouteOverview'
import RouteDomain from './routes/RouteDomain'
import RouteViews from './routes/RouteViews'
import RoutePages from './routes/RoutePages'
import RouteReferrers from './routes/RouteReferrers'
import RouteDurations from './routes/RouteDurations'
import RouteEvents from './routes/RouteEvents'
import RouteSystems from './routes/RouteSystems'
import RouteDevices from './routes/RouteDevices'
import RouteBrowsers from './routes/RouteBrowsers'
import RouteSizes from './routes/RouteSizes'
import RouteLanguages from './routes/RouteLanguages'
import RouteSettings from './routes/RouteSettings'

const routeComponents = {
	[routes.OVERVIEW]: RouteOverview,
	[routes.DOMAIN]: RouteDomain,
	[routes.VIEWS]: RouteViews,
	[routes.PAGES]: RoutePages,
	[routes.REFERRERS]: RouteReferrers,
	[routes.DURATIONS]: RouteDurations,
	[routes.EVENTS]: RouteEvents,
	[routes.SYSTEMS]: RouteSystems,
	[routes.DEVICES]: RouteDevices,
	[routes.BROWSERS]: RouteBrowsers,
	[routes.SIZES]: RouteSizes,
	[routes.LANGUAGES]: RouteLanguages,
	[routes.SETTINGS]: RouteSettings
}

const gotoDomainWhenDefined = (domains, setRoute, index) => {

	const domain = domains.value[index]
	if (domain != null) setRoute(`/domains/${ domain.id }`)

}

const Dashboard = (props) => {

	const currentRoute = useRoute(props.route)

	useEffect(() => {

		props.fetchDomains(props)
		props.fetchEvents(props)

	}, [])

	useEffect(() => {

		document.scrollingElement.scrollTop = 0

	}, [ props.route ])

	useHotkeys('o', () => props.setRoute('/'))

	useHotkeys('v', () => props.setRoute('/insights/views'))
	useHotkeys('p', () => props.setRoute('/insights/pages'))
	useHotkeys('r', () => props.setRoute('/insights/referrers'))
	useHotkeys('d', () => props.setRoute('/insights/durations'))

	useHotkeys('e', () => props.setRoute('/insights/events'))

	useHotkeys('0', () => gotoDomainWhenDefined(props.domains, props.setRoute, 0), [ props.domains ])
	useHotkeys('1', () => gotoDomainWhenDefined(props.domains, props.setRoute, 1), [ props.domains ])
	useHotkeys('2', () => gotoDomainWhenDefined(props.domains, props.setRoute, 2), [ props.domains ])
	useHotkeys('3', () => gotoDomainWhenDefined(props.domains, props.setRoute, 3), [ props.domains ])
	useHotkeys('4', () => gotoDomainWhenDefined(props.domains, props.setRoute, 4), [ props.domains ])
	useHotkeys('5', () => gotoDomainWhenDefined(props.domains, props.setRoute, 5), [ props.domains ])
	useHotkeys('6', () => gotoDomainWhenDefined(props.domains, props.setRoute, 6), [ props.domains ])
	useHotkeys('7', () => gotoDomainWhenDefined(props.domains, props.setRoute, 7), [ props.domains ])
	useHotkeys('8', () => gotoDomainWhenDefined(props.domains, props.setRoute, 8), [ props.domains ])
	useHotkeys('9', () => gotoDomainWhenDefined(props.domains, props.setRoute, 9), [ props.domains ])

	const hasDomains = props.domains.value.length > 0

	const domainsLabel = (activeItem) => activeItem == null ? 'Domains' : activeItem.label
	const insightsLabel = (activeItem) => activeItem == null ? 'Insights' : activeItem.label

	const domainsItems = props.domains.value.map((domain, index) =>
		createDropdownButton(domain.title, `/domains/${ domain.id }`, props, whenBelow(index, 10))
	)

	const insightsItems = [
		createDropdownButton('Views', '/insights/views', props, 'v'),
		createDropdownButton('Pages', '/insights/pages', props, 'p'),
		createDropdownButton('Referrers', '/insights/referrers', props, 'r'),
		createDropdownButton('Durations', '/insights/durations', props, 'd'),
		createDropdownSeparator(),
		createDropdownButton('Events', '/insights/events', props, 'e'),
		createDropdownSeparator(),
		createDropdownButton('Systems', '/insights/systems', props),
		createDropdownButton('Devices', '/insights/devices', props),
		createDropdownButton('Browsers', '/insights/browsers', props),
		createDropdownButton('Sizes', '/insights/sizes', props),
		createDropdownButton('Languages', '/insights/languages', props)
	]

	const items = [
		createButton('Overview', '/', props),
		hasDomains === true ? createDropdown(domainsLabel, domainsItems) : undefined,
		createDropdown(insightsLabel, insightsItems),
		createButton('Settings', '/settings', props)
	].filter(Boolean)

	return (
		h('div', {},
			h(Modals, props),
			h(Header, {
				fetching: props.fetching,
				items
			}),
			h('main', { className: 'content' },
				h(routeComponents[currentRoute.key], props)
			)
		)
	)

}

export default Dashboard
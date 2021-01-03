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

const gotoDomainWhenDefined = (props, index) => {

	const domain = props.domains.value[index]
	if (domain != null) props.setRoute(`/domains/${ domain.id }`)

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

	useHotkeys('0', () => gotoDomainWhenDefined(props, 0), [ props ])
	useHotkeys('1', () => gotoDomainWhenDefined(props, 1), [ props ])
	useHotkeys('2', () => gotoDomainWhenDefined(props, 2), [ props ])
	useHotkeys('3', () => gotoDomainWhenDefined(props, 3), [ props ])
	useHotkeys('4', () => gotoDomainWhenDefined(props, 4), [ props ])
	useHotkeys('5', () => gotoDomainWhenDefined(props, 5), [ props ])
	useHotkeys('6', () => gotoDomainWhenDefined(props, 6), [ props ])
	useHotkeys('7', () => gotoDomainWhenDefined(props, 7), [ props ])
	useHotkeys('8', () => gotoDomainWhenDefined(props, 8), [ props ])
	useHotkeys('9', () => gotoDomainWhenDefined(props, 9), [ props ])

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
				currentRoute.key === routes.OVERVIEW && h(RouteOverview, props),
				currentRoute.key === routes.DOMAIN && h(RouteDomain, props),
				currentRoute.key === routes.VIEWS && h(RouteViews, props),
				currentRoute.key === routes.PAGES && h(RoutePages, props),
				currentRoute.key === routes.REFERRERS && h(RouteReferrers, props),
				currentRoute.key === routes.DURATIONS && h(RouteDurations, props),
				currentRoute.key === routes.EVENTS && h(RouteEvents, props),
				currentRoute.key === routes.SYSTEMS && h(RouteSystems, props),
				currentRoute.key === routes.DEVICES && h(RouteDevices, props),
				currentRoute.key === routes.BROWSERS && h(RouteBrowsers, props),
				currentRoute.key === routes.SIZES && h(RouteSizes, props),
				currentRoute.key === routes.LANGUAGES && h(RouteLanguages, props),
				currentRoute.key === routes.SETTINGS && h(RouteSettings, props)
			)
		)
	)

}

export default Dashboard
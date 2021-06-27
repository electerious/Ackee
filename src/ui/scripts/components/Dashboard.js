import { createElement as h } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import useDomains from '../api/hooks/domains/useDomains'
import whenBelow from '../utils/whenBelow'
import * as routes from '../constants/routes'
import useRoute from '../hooks/useRoute'

import Header, { createButton, createDropdown, createDropdownButton, createDropdownSeparator } from './Header'
import Modals from './modals/Modals'

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
	[routes.SETTINGS]: RouteSettings,
}

const gotoDomainWhenDefined = (domains, setRoute, index) => {
	const domain = domains[index]
	if (domain != null) setRoute(`/domains/${ domain.id }`)
}

const Dashboard = (props) => {
	const currentRoute = useRoute(props.route)
	const domains = useDomains()

	useHotkeys('o', () => props.setRoute('/'))
	useHotkeys('v', () => props.setRoute('/insights/views'))
	useHotkeys('p', () => props.setRoute('/insights/pages'))
	useHotkeys('r', () => props.setRoute('/insights/referrers'))
	useHotkeys('d', () => props.setRoute('/insights/durations'))
	useHotkeys('e', () => props.setRoute('/insights/events'))
	useHotkeys('s', () => props.setRoute('/settings'))
	useHotkeys('0,1,2,3,4,5,6,7,8,9', (e, { key }) => gotoDomainWhenDefined(domains.value, props.setRoute, key), [ domains.value ])

	const hasDomains = domains.value.length > 0

	const domainsLabel = (activeItem) => activeItem == null ? 'Domains' : activeItem.label
	const insightsLabel = (activeItem) => activeItem == null ? 'Insights' : activeItem.label

	const domainsItems = domains.value.map(
		(domain, index) => createDropdownButton(domain.title, `/domains/${ domain.id }`, props.route, props.setRoute, whenBelow(index, 10)),
	)

	const insightsItems = [
		createDropdownButton('Views', '/insights/views', props.route, props.setRoute, 'v'),
		createDropdownButton('Pages', '/insights/pages', props.route, props.setRoute, 'p'),
		createDropdownButton('Referrers', '/insights/referrers', props.route, props.setRoute, 'r'),
		createDropdownButton('Durations', '/insights/durations', props.route, props.setRoute, 'd'),
		createDropdownSeparator(),
		createDropdownButton('Events', '/insights/events', props.route, props.setRoute, 'e'),
		createDropdownSeparator(),
		createDropdownButton('Systems', '/insights/systems', props.route, props.setRoute),
		createDropdownButton('Devices', '/insights/devices', props.route, props.setRoute),
		createDropdownButton('Browsers', '/insights/browsers', props.route, props.setRoute),
		createDropdownButton('Sizes', '/insights/sizes', props.route, props.setRoute),
		createDropdownButton('Languages', '/insights/languages', props.route, props.setRoute),
	]

	const items = [
		createButton('Overview', '/', props.route, props.setRoute),
		hasDomains === true ? createDropdown(domainsLabel, domainsItems) : undefined,
		createDropdown(insightsLabel, insightsItems),
		createButton('Settings', '/settings', props.route, props.setRoute),
	].filter(Boolean)

	return (
		h('div', {},
			h(Modals, {
				modals: props.modals,
				removeModal: props.removeModal,
			}),
			h(Header, {
				loading: props.loading,
				items,
			}),
			h('main', { className: 'content' },
				h(routeComponents[currentRoute.key], {
					reset: props.reset,
					route: props.route,
					setRoute: props.setRoute,
					token: props.token,
					addModal: props.addModal,
					filters: props.filters,
				}),
			),
		)
	)
}

export default Dashboard
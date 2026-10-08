import { createElement as h } from 'react'

import useDomains from '../api/hooks/domains/use-domains.js'
import * as routes from '../constants/routes.js'
import useHotkey from '../hooks/use-hotkey.js'
import useRoute from '../hooks/use-route.js'
import whenBelow from '../utils/when-below.js'

import Header, { createButton, createDropdown, createDropdownButton, createDropdownSeparator } from './header.js'
import Modals from './modals/modals.js'

import RouteBrowsers from './routes/route-browsers.js'
import RouteDevices from './routes/route-devices.js'
import RouteDomain from './routes/route-domain.js'
import RouteDurations from './routes/route-durations.js'
import RouteEvents from './routes/route-events.js'
import RouteLanguages from './routes/route-languages.js'
import RouteOverview from './routes/route-overview.js'
import RoutePages from './routes/route-pages.js'
import RouteReferrers from './routes/route-referrers.js'
import RouteSettings from './routes/route-settings.js'
import RouteSizes from './routes/route-sizes.js'
import RouteSystems from './routes/route-systems.js'
import RouteViews from './routes/route-views.js'

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
  if (domain != null) setRoute(`/domains/${domain.id}`)
}

const Dashboard = (props) => {
  const currentRoute = useRoute(props.route)
  const domains = useDomains()

  useHotkey('o', () => props.setRoute('/'))
  useHotkey('v', () => props.setRoute('/insights/views'))
  useHotkey('p', () => props.setRoute('/insights/pages'))
  useHotkey('r', () => props.setRoute('/insights/referrers'))
  useHotkey('d', () => props.setRoute('/insights/durations'))
  useHotkey('e', () => props.setRoute('/insights/events'))
  useHotkey('s', () => props.setRoute('/settings'))
  useHotkey('0,1,2,3,4,5,6,7,8,9', (event, { key }) => gotoDomainWhenDefined(domains.value, props.setRoute, key), {}, [
    domains.value,
  ])

  const hasDomains = domains.value.length > 0

  const domainsLabel = (activeItem) => (activeItem == null ? 'Domains' : activeItem.label)
  const insightsLabel = (activeItem) => (activeItem == null ? 'Insights' : activeItem.label)

  const domainsItems = domains.value.map((domain, index) =>
    createDropdownButton(domain.title, `/domains/${domain.id}`, props.route, props.setRoute, whenBelow(index, 10)),
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
    hasDomains ? createDropdown(domainsLabel, domainsItems) : undefined,
    createDropdown(insightsLabel, insightsItems),
    createButton('Settings', '/settings', props.route, props.setRoute),
  ].filter(Boolean)

  return h(
    'div',
    {},
    h(Modals, {
      modals: props.modals,
      removeModal: props.removeModal,
    }),
    h(Header, {
      loading: props.loading,
      items,
    }),
    h(
      'main',
      { className: 'content' },
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
}

export default Dashboard

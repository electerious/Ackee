import RouteOverview from '../components/routes/RouteOverview'
import RouteDomain from '../components/routes/RouteDomain'
import RouteViews from '../components/routes/RouteViews'
import RoutePages from '../components/routes/RoutePages'
import RouteReferrers from '../components/routes/RouteReferrers'
import RouteDurations from '../components/routes/RouteDurations'
import RouteBrowsers from '../components/routes/RouteBrowsers'
import RouteDevices from '../components/routes/RouteDevices'
import RouteLanguages from '../components/routes/RouteLanguages'
import RouteSystems from '../components/routes/RouteSystems'
import RouteSizes from '../components/routes/RouteSizes'
import RouteSettings from '../components/routes/RouteSettings'

export const ROUTE_OVERVIEW = { key: 'route_overview', name: 'Overview', component: RouteOverview }
export const ROUTE_DOMAIN = { key: 'route_domain', name: 'Domains', component: RouteDomain }
export const ROUTE_VIEWS = { key: 'route_views', name: 'View', component: RouteViews }
export const ROUTE_PAGES = { key: 'route_pages', name: 'Pages', component: RoutePages }
export const ROUTE_REFERRERS = { key: 'route_referrers', name: 'Referrers', component: RouteReferrers }
export const ROUTE_DURATIONS = { key: 'route_durations', name: 'Durations', component: RouteDurations }
export const ROUTE_LANGUAGES = { key: 'route_languages', name: 'Languages', component: RouteLanguages }
export const ROUTE_SIZES = { key: 'route_sizes', name: 'Sizes', component: RouteSizes }
export const ROUTE_SYSTEMS = { key: 'route_systems', name: 'Systems', component: RouteSystems }
export const ROUTE_SETTINGS = { key: 'route_settings', name: 'Settings', component: RouteSettings }
export const ROUTE_DEVICES = { key: 'route_devices', name: 'Devices', component: RouteDevices }
export const ROUTE_BROWSERS = { key: 'route_browsers', name: 'Browsers', component: RouteBrowsers }
import UrlPattern from 'url-pattern'

export const OVERVIEW = Symbol()
export const DOMAIN = Symbol()
export const VIEWS = Symbol()
export const PAGES = Symbol()
export const REFERRERS = Symbol()
export const DURATIONS = Symbol()
export const EVENTS = Symbol()
export const SYSTEMS = Symbol()
export const DEVICES = Symbol()
export const BROWSERS = Symbol()
export const SIZES = Symbol()
export const LANGUAGES = Symbol()
export const SETTINGS = Symbol()

const routes = [
	{
		pattern: new UrlPattern('/'),
		key: OVERVIEW
	},
	{
		pattern: new UrlPattern('/domains/:domainId'),
		key: DOMAIN
	},
	{
		pattern: new UrlPattern('/insights/views'),
		key: VIEWS
	},
	{
		pattern: new UrlPattern('/insights/pages'),
		key: PAGES
	},
	{
		pattern: new UrlPattern('/insights/referrers'),
		key: REFERRERS
	},
	{
		pattern: new UrlPattern('/insights/durations'),
		key: DURATIONS
	},
	{
		pattern: new UrlPattern('/insights/events'),
		key: EVENTS
	},
	{
		pattern: new UrlPattern('/insights/systems'),
		key: SYSTEMS
	},
	{
		pattern: new UrlPattern('/insights/devices'),
		key: DEVICES
	},
	{
		pattern: new UrlPattern('/insights/browsers'),
		key: BROWSERS
	},
	{
		pattern: new UrlPattern('/insights/sizes'),
		key: SIZES
	},
	{
		pattern: new UrlPattern('/insights/languages'),
		key: LANGUAGES
	},
	{
		pattern: new UrlPattern('/settings'),
		key: SETTINGS
	}
]

export const defaultRoute = routes[0]
export default routes
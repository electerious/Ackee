import { createElement as h, Fragment } from 'react'

import { SORTINGS_TOP } from '../../../../constants/sortings'
import { RANGES_LAST_24_HOURS } from '../../../../constants/ranges'
import { INTERVALS_DAILY } from '../../../../constants/intervals'
import { VIEWS_TYPE_UNIQUE } from '../../../../constants/views'
import { REFERRERS_TYPE_WITH_SOURCE } from '../../../../constants/referrers'
import { SYSTEMS_TYPE_WITH_VERSION } from '../../../../constants/systems'
import { DEVICES_TYPE_WITH_MODEL } from '../../../../constants/devices'
import { BROWSERS_TYPE_WITH_VERSION } from '../../../../constants/browsers'
import { SIZES_TYPE_BROWSER_RESOLUTION } from '../../../../constants/sizes'

import useFacts from '../../api/hooks/useFacts'
import useViews from '../../api/hooks/useViews'
import useDurations from '../../api/hooks/useDurations'
import usePages from '../../api/hooks/usePages'
import useReferrers from '../../api/hooks/useReferrers'
import useSystems from '../../api/hooks/useSystems'
import useDevices from '../../api/hooks/useDevices'
import useMergedBrowsers from '../../api/hooks/browsers/useMergedBrowsers'
import useSizes from '../../api/hooks/useSizes'
import useLanguages from '../../api/hooks/useLanguages'

import enhanceFacts from '../../enhancers/enhanceFacts'
import enhanceViews from '../../enhancers/enhanceViews'
import enhanceDurations from '../../enhancers/enhanceDurations'
import enhancePages from '../../enhancers/enhancePages'
import enhanceReferrers from '../../enhancers/enhanceReferrers'
import enhanceSystems from '../../enhancers/enhanceSystems'
import enhanceDevices from '../../enhancers/enhanceDevices'
import enhanceSizes from '../../enhancers/enhanceSizes'
import enhanceLanguages from '../../enhancers/enhanceLanguages'

import CardFactsWidget from '../cards/CardFactsWidget'
import CardWidget from '../cards/CardWidget'

import RendererViews from '../renderers/RendererViews'
import RendererDurations from '../renderers/RendererDurations'
import RendererList from '../renderers/RendererList'
import RendererReferrers from '../renderers/RendererReferrers'

const RouteOverview = (props) => {

	const facts = useFacts()

	const views = useViews(INTERVALS_DAILY, VIEWS_TYPE_UNIQUE)
	const durations = useDurations(INTERVALS_DAILY)
	const pages = usePages(SORTINGS_TOP, RANGES_LAST_24_HOURS)
	const referrers = useReferrers(SORTINGS_TOP, REFERRERS_TYPE_WITH_SOURCE, RANGES_LAST_24_HOURS)

	const systems = useSystems(SORTINGS_TOP, SYSTEMS_TYPE_WITH_VERSION, RANGES_LAST_24_HOURS)
	const devices = useDevices(SORTINGS_TOP, DEVICES_TYPE_WITH_MODEL, RANGES_LAST_24_HOURS)
	const browsers = useMergedBrowsers({
		sorting: SORTINGS_TOP,
		type: BROWSERS_TYPE_WITH_VERSION,
		range: RANGES_LAST_24_HOURS
	})
	const sizes = useSizes(SORTINGS_TOP, SIZES_TYPE_BROWSER_RESOLUTION, RANGES_LAST_24_HOURS)
	const languages = useLanguages(SORTINGS_TOP, RANGES_LAST_24_HOURS)

	return (
		h(Fragment, {},
			h(CardFactsWidget, {
				widget: {
					value: enhanceFacts(facts.value.facts),
					fetching: views.fetching
				}
			}),
			h('div', { className: 'content__spacer' }),
			h(CardWidget, {
				wide: true,
				headline: 'Site Views',
				onMore: () => props.setRoute('/insights/views'),
				widget: {
					Renderer: RendererViews,
					variables: {
						interval: INTERVALS_DAILY
					},
					value: enhanceViews(views.value.statistics.views, 14),
					fetching: views.fetching
				}
			}),
			h(CardWidget, {
				wide: true,
				headline: 'Durations',
				onMore: () => props.setRoute('/insights/durations'),
				widget: {
					Renderer: RendererDurations,
					variables: {
						interval: INTERVALS_DAILY
					},
					value: enhanceDurations(durations.value.statistics.durations, 14),
					fetching: durations.fetching
				}
			}),
			h(CardWidget, {
				headline: 'Pages',
				onMore: () => props.setRoute('/insights/pages'),
				widget: {
					Renderer: RendererList,
					variables: {
						sorting: INTERVALS_DAILY,
						range: RANGES_LAST_24_HOURS
					},
					value: enhancePages(pages.value.statistics.pages),
					fetching: pages.fetching
				}
			}),
			h(CardWidget, {
				headline: 'Referrers',
				onMore: () => props.setRoute('/insights/referrers'),
				widget: {
					Renderer: RendererReferrers,
					variables: {
						sorting: INTERVALS_DAILY,
						range: RANGES_LAST_24_HOURS
					},
					value: enhanceReferrers(referrers.value.statistics.referrers),
					fetching: referrers.fetching
				}
			}),
			h('div', { className: 'content__spacer' }),
			h(CardWidget, {
				headline: 'Systems',
				onMore: () => props.setRoute('/insights/systems'),
				widget: {
					Renderer: RendererList,
					variables: {
						sorting: SORTINGS_TOP,
						range: RANGES_LAST_24_HOURS
					},
					value: enhanceSystems(systems.value.statistics.systems),
					fetching: systems.fetching
				}
			}),
			h(CardWidget, {
				headline: 'Devices',
				onMore: () => props.setRoute('/insights/devices'),
				widget: {
					Renderer: RendererList,
					variables: {
						sorting: SORTINGS_TOP,
						range: RANGES_LAST_24_HOURS
					},
					value: enhanceDevices(devices.value.statistics.devices),
					fetching: devices.fetching
				}
			}),
			h(CardWidget, {
				headline: 'Browsers',
				onMore: () => props.setRoute('/insights/browsers'),
				widget: {
					Renderer: RendererList,
					variables: {
						sorting: SORTINGS_TOP,
						range: RANGES_LAST_24_HOURS
					},
					value: browsers.value.statistics.browsers,
					fetching: browsers.fetching
				}
			}),
			h(CardWidget, {
				headline: 'Sizes',
				onMore: () => props.setRoute('/insights/sizes'),
				widget: {
					Renderer: RendererList,
					variables: {
						sorting: SORTINGS_TOP,
						range: RANGES_LAST_24_HOURS
					},
					value: enhanceSizes(sizes.value.statistics.sizes),
					fetching: sizes.fetching
				}
			}),
			h(CardWidget, {
				headline: 'Sizes',
				onMore: () => props.setRoute('/insights/languages'),
				widget: {
					Renderer: RendererList,
					variables: {
						sorting: SORTINGS_TOP,
						range: RANGES_LAST_24_HOURS
					},
					value: enhanceLanguages(languages.value.statistics.languages),
					fetching: languages.fetching
				}
			})
		)
	)

}

export default RouteOverview
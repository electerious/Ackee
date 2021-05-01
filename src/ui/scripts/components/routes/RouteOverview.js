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
import useMergedViews from '../../api/hooks/views/useMergedViews'
import useMergedDurations from '../../api/hooks/durations/useMergedDurations'
import useMergedPages from '../../api/hooks/pages/useMergedPages'
import useMergedReferrers from '../../api/hooks/referrers/useMergedReferrers'
import useMergedSystems from '../../api/hooks/systems/useMergedSystems'
import useMergedDevices from '../../api/hooks/devices/useMergedDevices'
import useMergedBrowsers from '../../api/hooks/browsers/useMergedBrowsers'
import useMergedSizes from '../../api/hooks/sizes/useMergedSizes'
import useMergedLanguages from '../../api/hooks/languages/useMergedLanguages'

import enhanceFacts from '../../enhancers/enhanceFacts'

import CardFactsWidget from '../cards/CardFactsWidget'
import CardWidget from '../cards/CardWidget'

import RendererViews from '../renderers/RendererViews'
import RendererDurations from '../renderers/RendererDurations'
import RendererList from '../renderers/RendererList'
import RendererReferrers from '../renderers/RendererReferrers'

const RouteOverview = (props) => {

	const facts = useFacts()

	return (
		h(Fragment, {},
			h(CardFactsWidget, {
				widget: {
					value: enhanceFacts(facts.value.facts),
					fetching: facts.fetching
				}
			}),
			h('div', { className: 'content__spacer' }),
			h(CardWidget, {
				wide: true,
				headline: 'Views',
				onMore: () => props.setRoute('/insights/views'),
				hook: useMergedViews,
				hookArgs: [
					{
						interval: INTERVALS_DAILY,
						type: VIEWS_TYPE_UNIQUE,
						limit: 14
					}
				],
				renderer: RendererViews,
				rendererProps: {
					interval: INTERVALS_DAILY
				}
			}),
			h(CardWidget, {
				wide: true,
				headline: 'Durations',
				onMore: () => props.setRoute('/insights/durations'),
				hook: useMergedDurations,
				hookArgs: [
					{
						interval: INTERVALS_DAILY,
						limit: 14
					}
				],
				renderer: RendererDurations,
				rendererProps: {
					interval: INTERVALS_DAILY
				}
			}),
			h(CardWidget, {
				headline: 'Pages',
				onMore: () => props.setRoute('/insights/pages'),
				hook: useMergedPages,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						range: RANGES_LAST_24_HOURS
					}
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS
				}
			}),
			h(CardWidget, {
				headline: 'Referrers',
				onMore: () => props.setRoute('/insights/referrers'),
				hook: useMergedReferrers,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: REFERRERS_TYPE_WITH_SOURCE,
						range: RANGES_LAST_24_HOURS
					}
				],
				renderer: RendererReferrers,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS
				}
			}),
			h('div', { className: 'content__spacer' }),
			h(CardWidget, {
				headline: 'Systems',
				onMore: () => props.setRoute('/insights/systems'),
				hook: useMergedSystems,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: SYSTEMS_TYPE_WITH_VERSION,
						range: RANGES_LAST_24_HOURS
					}
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS
				}
			}),
			h(CardWidget, {
				headline: 'Devices',
				onMore: () => props.setRoute('/insights/devices'),
				hook: useMergedDevices,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: DEVICES_TYPE_WITH_MODEL,
						range: RANGES_LAST_24_HOURS
					}
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS
				}
			}),
			h(CardWidget, {
				headline: 'Browsers',
				onMore: () => props.setRoute('/insights/browsers'),
				hook: useMergedBrowsers,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: BROWSERS_TYPE_WITH_VERSION,
						range: RANGES_LAST_24_HOURS
					}
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS
				}
			}),
			h(CardWidget, {
				headline: 'Sizes',
				onMore: () => props.setRoute('/insights/sizes'),
				hook: useMergedSizes,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: SIZES_TYPE_BROWSER_RESOLUTION,
						range: RANGES_LAST_24_HOURS
					}
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS
				}
			}),
			h(CardWidget, {
				headline: 'Languages',
				onMore: () => props.setRoute('/insights/languages'),
				hook: useMergedLanguages,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						range: RANGES_LAST_24_HOURS
					}
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS
				}
			})
		)
	)

}

export default RouteOverview
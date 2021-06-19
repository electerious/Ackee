import { createElement as h, Fragment } from 'react'
import PropTypes from 'prop-types'

import { SORTINGS_TOP } from '../../../../constants/sortings'
import { RANGES_LAST_24_HOURS } from '../../../../constants/ranges'
import { INTERVALS_DAILY } from '../../../../constants/intervals'
import { VIEWS_TYPE_UNIQUE } from '../../../../constants/views'
import { REFERRERS_TYPE_WITH_SOURCE } from '../../../../constants/referrers'
import { SYSTEMS_TYPE_WITH_VERSION } from '../../../../constants/systems'
import { DEVICES_TYPE_WITH_MODEL } from '../../../../constants/devices'
import { BROWSERS_TYPE_WITH_VERSION } from '../../../../constants/browsers'
import { SIZES_TYPE_BROWSER_RESOLUTION } from '../../../../constants/sizes'

import { MODALS_VIEWS, MODALS_DURATIONS } from '../../constants/modals'

import useMergedActiveVisitors from '../../api/hooks/facts/useMergedActiveVisitors'
import useMergedFacts from '../../api/hooks/facts/useMergedFacts'
import useMergedViews from '../../api/hooks/views/useMergedViews'
import useMergedDurations from '../../api/hooks/durations/useMergedDurations'
import useMergedPages from '../../api/hooks/pages/useMergedPages'
import useMergedReferrers from '../../api/hooks/referrers/useMergedReferrers'
import useMergedSystems from '../../api/hooks/systems/useMergedSystems'
import useMergedDevices from '../../api/hooks/devices/useMergedDevices'
import useMergedBrowsers from '../../api/hooks/browsers/useMergedBrowsers'
import useMergedSizes from '../../api/hooks/sizes/useMergedSizes'
import useMergedLanguages from '../../api/hooks/languages/useMergedLanguages'

import CardFacts from '../cards/CardFacts'
import CardStatistics from '../cards/CardStatistics'

import RendererViews from '../renderers/RendererViews'
import RendererDurations from '../renderers/RendererDurations'
import RendererList from '../renderers/RendererList'
import RendererReferrers from '../renderers/RendererReferrers'

const RouteOverview = (props) => {
	useMergedActiveVisitors()

	return (
		h(Fragment, {},
			h(CardFacts, {
				hook: useMergedFacts,
				hookArgs: [],
			}),
			h('div', { className: 'content__spacer' }),
			h(CardStatistics, {
				wide: true,
				headline: 'Views',
				onMore: () => props.setRoute('/insights/views'),
				hook: useMergedViews,
				hookArgs: [
					{
						interval: INTERVALS_DAILY,
						type: VIEWS_TYPE_UNIQUE,
						limit: 14,
					},
				],
				renderer: RendererViews,
				rendererProps: {
					interval: INTERVALS_DAILY,
					onItemClick: (index) => props.addModal(MODALS_VIEWS, {
						index,
						interval: INTERVALS_DAILY,
						type: VIEWS_TYPE_UNIQUE,
						limit: 14,
					}),
				},
			}),
			h(CardStatistics, {
				wide: true,
				headline: 'Durations',
				onMore: () => props.setRoute('/insights/durations'),
				hook: useMergedDurations,
				hookArgs: [
					{
						interval: INTERVALS_DAILY,
						limit: 14,
					},
				],
				renderer: RendererDurations,
				rendererProps: {
					interval: INTERVALS_DAILY,
					onItemClick: (index) => props.addModal(MODALS_DURATIONS, {
						index,
						interval: INTERVALS_DAILY,
						limit: 14,
					}),
				},
			}),
			h(CardStatistics, {
				headline: 'Pages',
				onMore: () => props.setRoute('/insights/pages'),
				hook: useMergedPages,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						range: RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Referrers',
				onMore: () => props.setRoute('/insights/referrers'),
				hook: useMergedReferrers,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: REFERRERS_TYPE_WITH_SOURCE,
						range: RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererReferrers,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS,
				},
			}),
			h('div', { className: 'content__spacer' }),
			h(CardStatistics, {
				headline: 'Systems',
				onMore: () => props.setRoute('/insights/systems'),
				hook: useMergedSystems,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: SYSTEMS_TYPE_WITH_VERSION,
						range: RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Devices',
				onMore: () => props.setRoute('/insights/devices'),
				hook: useMergedDevices,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: DEVICES_TYPE_WITH_MODEL,
						range: RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Browsers',
				onMore: () => props.setRoute('/insights/browsers'),
				hook: useMergedBrowsers,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: BROWSERS_TYPE_WITH_VERSION,
						range: RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Sizes',
				onMore: () => props.setRoute('/insights/sizes'),
				hook: useMergedSizes,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						type: SIZES_TYPE_BROWSER_RESOLUTION,
						range: RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS,
				},
			}),
			h(CardStatistics, {
				headline: 'Languages',
				onMore: () => props.setRoute('/insights/languages'),
				hook: useMergedLanguages,
				hookArgs: [
					{
						sorting: SORTINGS_TOP,
						range: RANGES_LAST_24_HOURS,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: SORTINGS_TOP,
					range: RANGES_LAST_24_HOURS,
				},
			}),
		)
	)
}

RouteOverview.propTypes = {
	setRoute: PropTypes.func.isRequired,
}

export default RouteOverview
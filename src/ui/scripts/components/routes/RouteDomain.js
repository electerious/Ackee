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

import useRoute from '../../hooks/useRoute'
import useActiveVisitors from '../../api/hooks/facts/useActiveVisitors'
import useFacts from '../../api/hooks/facts/useFacts'
import useViews from '../../api/hooks/views/useViews'
import useDurations from '../../api/hooks/durations/useDurations'
import usePages from '../../api/hooks/pages/usePages'
import useReferrers from '../../api/hooks/referrers/useReferrers'
import useSystems from '../../api/hooks/systems/useSystems'
import useDevices from '../../api/hooks/devices/useDevices'
import useBrowsers from '../../api/hooks/browsers/useBrowsers'
import useSizes from '../../api/hooks/sizes/useSizes'
import useLanguages from '../../api/hooks/languages/useLanguages'

import CardFacts from '../cards/CardFacts'
import CardStatistics from '../cards/CardStatistics'

import RendererViews from '../renderers/RendererViews'
import RendererDurations from '../renderers/RendererDurations'
import RendererList from '../renderers/RendererList'
import RendererReferrers from '../renderers/RendererReferrers'

const RouteDomain = (props) => {
	const currentRoute = useRoute(props.route)
	const domainId = currentRoute.params.domainId

	useActiveVisitors(domainId)

	return (
		h(Fragment, {},
			h(CardFacts, {
				hook: useFacts,
				hookArgs: [
					domainId,
				],
			}),
			h('div', { className: 'content__spacer' }),
			h(CardStatistics, {
				wide: true,
				headline: 'Views',
				onMore: () => props.setRoute('/insights/views'),
				hook: useViews,
				hookArgs: [
					domainId,
					{
						interval: INTERVALS_DAILY,
						type: VIEWS_TYPE_UNIQUE,
						limit: 14,
					},
				],
				renderer: RendererViews,
				rendererProps: {
					interval: INTERVALS_DAILY,
				},
			}),
			h(CardStatistics, {
				wide: true,
				headline: 'Durations',
				onMore: () => props.setRoute('/insights/durations'),
				hook: useDurations,
				hookArgs: [
					domainId,
					{
						interval: INTERVALS_DAILY,
						limit: 14,
					},
				],
				renderer: RendererDurations,
				rendererProps: {
					interval: INTERVALS_DAILY,
				},
			}),
			h(CardStatistics, {
				headline: 'Pages',
				onMore: () => props.setRoute('/insights/pages'),
				hook: usePages,
				hookArgs: [
					domainId,
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
				hook: useReferrers,
				hookArgs: [
					domainId,
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
				hook: useSystems,
				hookArgs: [
					domainId,
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
				hook: useDevices,
				hookArgs: [
					domainId,
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
				hook: useBrowsers,
				hookArgs: [
					domainId,
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
				hook: useSizes,
				hookArgs: [
					domainId,
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
				hook: useLanguages,
				hookArgs: [
					domainId,
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

RouteDomain.propTypes = {
	route: PropTypes.string.isRequired,
	setRoute: PropTypes.func.isRequired,
}

export default RouteDomain
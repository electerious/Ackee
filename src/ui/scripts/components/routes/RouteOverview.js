import { createElement as h, Fragment } from 'react'

import { SORTINGS_TOP } from '../../../../constants/sortings'
import { RANGES_LAST_24_HOURS } from '../../../../constants/ranges'
import { INTERVALS_DAILY } from '../../../../constants/intervals'
import { VIEWS_TYPE_UNIQUE } from '../../../../constants/views'
import { SYSTEMS_TYPE_WITH_VERSION } from '../../../../constants/systems'
import { DEVICES_TYPE_WITH_MODEL } from '../../../../constants/devices'
import { BROWSERS_TYPE_WITH_VERSION } from '../../../../constants/browsers'
import { SIZES_TYPE_BROWSER_RESOLUTION } from '../../../../constants/sizes'

import * as route from '../../constants/route'
import useWidgets from '../../hooks/useWidgets'

import mergedViewsLoader from '../../loaders/mergedViewsLoader'
import mergedDurationsLoader from '../../loaders/mergedDurationsLoader'
import mergedPagesLoader from '../../loaders/mergedPagesLoader'
import mergedReferrersLoader from '../../loaders/mergedReferrersLoader'
import mergedSystemsLoader from '../../loaders/mergedSystemsLoader'
import mergedDevicesLoader from '../../loaders/mergedDevicesLoader'
import mergedBrowsersLoader from '../../loaders/mergedBrowsersLoader'
import mergedSizesLoader from '../../loaders/mergedSizesLoader'
import mergedLanguagesLoader from '../../loaders/mergedLanguagesLoader'

// TODO: Refactor facts
// import enhanceFacts from '../../enhancers/enhanceFacts'
// import CardFacts from '../cards/CardFacts'

const RouteOverview = (props) => {

	// const domainId = props.route.params.domainId || ALL_DOMAINS

	const renderedEssentialWidgets = useWidgets(props, [
		{
			loader: mergedViewsLoader({
				interval: INTERVALS_DAILY,
				type: VIEWS_TYPE_UNIQUE
			}),
			additionalProps: {
				wide: true,
				headline: 'Site Views',
				onMore: () => props.setRoute(route.ROUTE_VIEWS)
			}
		},
		{
			loader: mergedDurationsLoader({
				interval: INTERVALS_DAILY
			}),
			additionalProps: {
				wide: true,
				headline: 'Durations',
				onMore: () => props.setRoute(route.ROUTE_DURATIONS)
			}
		},
		{
			loader: mergedPagesLoader({
				range: RANGES_LAST_24_HOURS,
				sorting: SORTINGS_TOP
			}),
			additionalProps: {
				headline: 'Pages',
				onMore: () => props.setRoute(route.ROUTE_PAGES)
			}
		},
		{
			loader: mergedReferrersLoader({
				range: RANGES_LAST_24_HOURS,
				sorting: SORTINGS_TOP
			}),
			additionalProps: {
				headline: 'Referrers',
				onMore: () => props.setRoute(route.ROUTE_REFERRERS)
			}
		}
	])

	const renderedDetailedWidgets = useWidgets(props, [
		{
			loader: mergedSystemsLoader({
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS,
				type: SYSTEMS_TYPE_WITH_VERSION
			}),
			additionalProps: {
				headline: 'Systems',
				onMore: () => props.setRoute(route.ROUTE_SYSTEMS)
			}
		},
		{
			loader: mergedDevicesLoader({
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS,
				type: DEVICES_TYPE_WITH_MODEL
			}),
			additionalProps: {
				headline: 'Devices',
				onMore: () => props.setRoute(route.ROUTE_DEVICES)
			}
		},
		{
			loader: mergedBrowsersLoader({
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS,
				type: BROWSERS_TYPE_WITH_VERSION
			}),
			additionalProps: {
				headline: 'Browsers',
				onMore: () => props.setRoute(route.ROUTE_BROWSERS)
			}
		},
		{
			loader: mergedSizesLoader({
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS,
				type: SIZES_TYPE_BROWSER_RESOLUTION
			}),
			additionalProps: {
				headline: 'Sizes',
				onMore: () => props.setRoute(route.ROUTE_SIZES)
			}
		},
		{
			loader: mergedLanguagesLoader({
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Languages',
				onMore: () => props.setRoute(route.ROUTE_LANGUAGES)
			}
		}
	])

	return (
		h(Fragment, {},
			// h(CardFacts, {
			// 	items: enhanceFacts(selectOverviewValue.withoutType(props, domainId).facts)
			// }),
			h('div', { className: 'content__spacer' }),
			renderedEssentialWidgets,
			h('div', { className: 'content__spacer' }),
			renderedDetailedWidgets
		)
	)

}

export default RouteOverview
import { createElement as h, Fragment, useMemo } from 'react'

import { SORTINGS_TOP } from '../../../../constants/sortings'
import { RANGES_LAST_24_HOURS } from '../../../../constants/ranges'
import { INTERVALS_DAILY } from '../../../../constants/intervals'
import { VIEWS_TYPE_UNIQUE } from '../../../../constants/views'
import { REFERRERS_TYPE_WITH_SOURCE } from '../../../../constants/referrers'
import { SYSTEMS_TYPE_WITH_VERSION } from '../../../../constants/systems'
import { DEVICES_TYPE_WITH_MODEL } from '../../../../constants/devices'
import { BROWSERS_TYPE_WITH_VERSION } from '../../../../constants/browsers'
import { SIZES_TYPE_BROWSER_RESOLUTION } from '../../../../constants/sizes'

import useWidgets from '../../hooks/useWidgets'

import mergedFactsLoader from '../../loaders/mergedFactsLoader'
import mergedViewsLoader from '../../loaders/mergedViewsLoader'
import mergedDurationsLoader from '../../loaders/mergedDurationsLoader'
import mergedPagesLoader from '../../loaders/mergedPagesLoader'
import mergedReferrersLoader from '../../loaders/mergedReferrersLoader'
import mergedSystemsLoader from '../../loaders/mergedSystemsLoader'
import mergedDevicesLoader from '../../loaders/mergedDevicesLoader'
import mergedBrowsersLoader from '../../loaders/mergedBrowsersLoader'
import mergedSizesLoader from '../../loaders/mergedSizesLoader'
import mergedLanguagesLoader from '../../loaders/mergedLanguagesLoader'

import CardFactsWidget from '../cards/CardFactsWidget'

const RouteOverview = (props) => {

	const factsWidgetConfigs = useMemo(() => [
		{
			WidgetComponent: CardFactsWidget,
			loader: mergedFactsLoader({})
		}
	], [])

	const essentialWidgetConfigs = useMemo(() => [
		{
			loader: mergedViewsLoader({
				interval: INTERVALS_DAILY,
				type: VIEWS_TYPE_UNIQUE,
				limit: 14
			}),
			additionalProps: {
				wide: true,
				headline: 'Site Views',
				onMore: () => props.setRoute('/insights/views')
			}
		},
		{
			loader: mergedDurationsLoader({
				interval: INTERVALS_DAILY,
				limit: 14
			}),
			additionalProps: {
				wide: true,
				headline: 'Durations',
				onMore: () => props.setRoute('/insights/durations')
			}
		},
		{
			loader: mergedPagesLoader({
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Pages',
				onMore: () => props.setRoute('/insights/pages')
			}
		},
		{
			loader: mergedReferrersLoader({
				sorting: SORTINGS_TOP,
				type: REFERRERS_TYPE_WITH_SOURCE,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Referrers',
				onMore: () => props.setRoute('/insights/referrers')
			}
		}
	], [])

	const detailedWidgetConfigs = useMemo(() => [
		{
			loader: mergedSystemsLoader({
				sorting: SORTINGS_TOP,
				type: SYSTEMS_TYPE_WITH_VERSION,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Systems',
				onMore: () => props.setRoute('/insights/systems')
			}
		},
		{
			loader: mergedDevicesLoader({
				sorting: SORTINGS_TOP,
				type: DEVICES_TYPE_WITH_MODEL,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Devices',
				onMore: () => props.setRoute('/insights/devices')
			}
		},
		{
			loader: mergedBrowsersLoader({
				sorting: SORTINGS_TOP,
				type: BROWSERS_TYPE_WITH_VERSION,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Browsers',
				onMore: () => props.setRoute('/insights/browsers')
			}
		},
		{
			loader: mergedSizesLoader({
				sorting: SORTINGS_TOP,
				type: SIZES_TYPE_BROWSER_RESOLUTION,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Sizes',
				onMore: () => props.setRoute('/insights/sizes')
			}
		},
		{
			loader: mergedLanguagesLoader({
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Languages',
				onMore: () => props.setRoute('/insights/languages')
			}
		}
	], [])

	const renderedFactsWidgets = useWidgets(props, factsWidgetConfigs)
	const renderedEssentialWidgets = useWidgets(props, essentialWidgetConfigs)
	const renderedDetailedWidgets = useWidgets(props, detailedWidgetConfigs)

	return (
		h(Fragment, {},
			renderedFactsWidgets,
			h('div', { className: 'content__spacer' }),
			renderedEssentialWidgets,
			h('div', { className: 'content__spacer' }),
			renderedDetailedWidgets
		)
	)

}

export default RouteOverview
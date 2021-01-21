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

import useRoute from '../../hooks/useRoute'
import useWidgets from '../../hooks/useWidgets'

import factsLoader from '../../loaders/factsLoader'
import viewsLoader from '../../loaders/viewsLoader'
import durationsLoader from '../../loaders/durationsLoader'
import pagesLoader from '../../loaders/pagesLoader'
import referrersLoader from '../../loaders/referrersLoader'
import systemsLoader from '../../loaders/systemsLoader'
import devicesLoader from '../../loaders/devicesLoader'
import browsersLoader from '../../loaders/browsersLoader'
import sizesLoader from '../../loaders/sizesLoader'
import languagesLoader from '../../loaders/languagesLoader'

import CardFactsWidget from '../cards/CardFactsWidget'

const RouteDomain = (props) => {

	const currentRoute = useRoute(props.route)
	const domainId = currentRoute.params.domainId

	const factsWidgetConfigs = useMemo(() => [
		{
			key: 'routeDomainFacts',
			WidgetComponent: CardFactsWidget,
			loader: factsLoader(domainId, {})
		}
	], [ domainId ])

	const essentialWidgetConfigs = useMemo(() => [
		{
			key: 'routeDomainViews',
			loader: viewsLoader(domainId, {
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
			key: 'routeDomainDurations',
			loader: durationsLoader(domainId, {
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
			key: 'routeDomainPages',
			loader: pagesLoader(domainId, {
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Pages',
				onMore: () => props.setRoute('/insights/pages')
			}
		},
		{
			key: 'routeDomainReferrers',
			loader: referrersLoader(domainId, {
				sorting: SORTINGS_TOP,
				type: REFERRERS_TYPE_WITH_SOURCE,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Referrers',
				onMore: () => props.setRoute('/insights/referrers')
			}
		}
	], [ domainId ])

	const detailedWidgetConfigs = useMemo(() => [
		{
			key: 'routeDomainSystems',
			loader: systemsLoader(domainId, {
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
			key: 'routeDomainDevices',
			loader: devicesLoader(domainId, {
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
			key: 'routeDomainBrowsers',
			loader: browsersLoader(domainId, {
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
			key: 'routeDomainSizes',
			loader: sizesLoader(domainId, {
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
			key: 'routeDomainLanguages',
			loader: languagesLoader(domainId, {
				sorting: SORTINGS_TOP,
				range: RANGES_LAST_24_HOURS
			}),
			additionalProps: {
				headline: 'Languages',
				onMore: () => props.setRoute('/insights/languages')
			}
		}
	], [ domainId ])

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

export default RouteDomain
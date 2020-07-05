import { createElement as h, Fragment, useEffect } from 'react'

import { DURATIONS_INTERVAL } from '../../../../constants/durations'
import * as route from '../../constants/route'
import { ALL_DOMAINS } from '../../actions/overview'
import * as selectOverviewValue from '../../selectors/selectOverviewValue'

import enhanceFacts from '../../enhancers/enhanceFacts'
import enhanceViews from '../../enhancers/enhanceViews'
import enhancePages from '../../enhancers/enhancePages'
import enhanceReferrers from '../../enhancers/enhanceReferrers'
import enhanceDurations from '../../enhancers/enhanceDurations'
import enhanceSystems from '../../enhancers/enhanceSystems'
import enhanceDevices from '../../enhancers/enhanceDevices'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import enhanceSizes from '../../enhancers/enhanceSizes'
import enhanceLanguages from '../../enhancers/enhanceLanguages'

import CardFacts from '../cards/CardFacts'
import CardViews from '../cards/CardViews'
import CardPages from '../cards/CardPages'
import CardReferrers from '../cards/CardReferrers'
import CardDurations from '../cards/CardDurations'
import CardSystems from '../cards/CardSystems'
import CardDevices from '../cards/CardDevices'
import CardBrowsers from '../cards/CardBrowsers'
import CardSizes from '../cards/CardSizes'
import CardLanguages from '../cards/CardLanguages'

const RouteOverview = (props) => {

	const domainId = props.route.params.domainId || ALL_DOMAINS
	const filterSorting = props.filter.sorting
	const filterRange = props.filter.range
	const filterInterval = props.filter.interval
	const isLoading = props.domains.fetching || selectOverviewValue.withoutType(props, domainId).fetching

	useEffect(() => {

		const fn = () => props.fetchOverview(props, domainId)
		const interval = setInterval(fn, DURATIONS_INTERVAL)

		fn()

		return () => clearInterval(interval)

	}, [ domainId, filterRange, filterInterval ])

	return (
		h(Fragment, {},

			h(CardFacts, {
				loading: isLoading,
				items: enhanceFacts(selectOverviewValue.withType(props, domainId, 'facts'))
			}),

			h('div', { className: 'content__spacer' }),

			h(CardViews, {
				wide: true,
				headline: 'Views',
				interval: filterInterval,
				loading: isLoading,
				items: enhanceViews(selectOverviewValue.withType(props, domainId, 'views'), 14),
				onMore: () => props.setRoute(route.ROUTE_VIEWS)
			}),

			h(CardDurations, {
				wide: true,
				headline: 'Durations',
				interval: filterInterval,
				loading: isLoading,
				items: enhanceDurations(selectOverviewValue.withType(props, domainId, 'durations'), 14),
				onMore: () => props.setRoute(route.ROUTE_DURATIONS)
			}),

			h(CardPages, {
				headline: 'Pages',
				range: filterRange,
				sorting: filterSorting,
				loading: isLoading,
				items: enhancePages(selectOverviewValue.withType(props, domainId, 'pages')),
				onMore: () => props.setRoute(route.ROUTE_PAGES)
			}),

			h(CardReferrers, {
				headline: 'Referrers',
				range: filterRange,
				sorting: filterSorting,
				loading: isLoading,
				items: enhanceReferrers(selectOverviewValue.withType(props, domainId, 'referrers')),
				onMore: () => props.setRoute(route.ROUTE_REFERRERS)
			}),

			h('div', { className: 'content__spacer' }),

			h(CardSystems, {
				headline: 'Systems',
				range: filterRange,
				sorting: filterSorting,
				loading: isLoading,
				items: enhanceSystems(selectOverviewValue.withType(props, domainId, 'systems')),
				onMore: () => props.setRoute(route.ROUTE_SYSTEMS)
			}),

			h(CardDevices, {
				headline: 'Devices',
				range: filterRange,
				sorting: filterSorting,
				loading: isLoading,
				items: enhanceDevices(selectOverviewValue.withType(props, domainId, 'devices')),
				onMore: () => props.setRoute(route.ROUTE_DEVICES)
			}),

			h(CardBrowsers, {
				headline: 'Browsers',
				range: filterRange,
				sorting: filterSorting,
				loading: isLoading,
				items: enhanceBrowsers(selectOverviewValue.withType(props, domainId, 'browsers')),
				onMore: () => props.setRoute(route.ROUTE_BROWSERS)
			}),

			h(CardSizes, {
				headline: 'Sizes',
				range: filterRange,
				sorting: filterSorting,
				loading: isLoading,
				items: enhanceSizes(selectOverviewValue.withType(props, domainId, 'sizes')),
				onMore: () => props.setRoute(route.ROUTE_SIZES)
			}),

			h(CardLanguages, {
				headline: 'Languages',
				range: filterRange,
				sorting: filterSorting,
				loading: isLoading,
				items: enhanceLanguages(selectOverviewValue.withType(props, domainId, 'languages')),
				onMore: () => props.setRoute(route.ROUTE_LANGUAGES)
			})

		)
	)

}

export default RouteOverview
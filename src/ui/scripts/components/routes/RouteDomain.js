import { createElement as h, Fragment, useEffect } from 'react'

import CardViews from '../cards/CardViews'
import CardPages from '../cards/CardPages'
import CardReferrers from '../cards/CardReferrers'
import CardDetailedDurations from '../cards/CardDetailedDurations'
import CardSystems from '../cards/CardSystems'
import CardDevices from '../cards/CardDevices'
import CardBrowsers from '../cards/CardBrowsers'
import CardSizes from '../cards/CardSizes'
import CardLanguages from '../cards/CardLanguages'

import * as route from '../../constants/route'

import selectViewsValue from '../../selectors/selectViewsValue'
import selectPagesValue from '../../selectors/selectPagesValue'
import selectReferrersValue from '../../selectors/selectReferrersValue'
import selectDurationsValue from '../../selectors/selectDurationsValue'
import selectSystemsValue from '../../selectors/selectSystemsValue'
import selectDevicesValue from '../../selectors/selectDevicesValue'
import selectBrowsersValue from '../../selectors/selectBrowsersValue'
import selectSizesValue from '../../selectors/selectSizesValue'
import selectLanguagesValue from '../../selectors/selectLanguagesValue'

import enhanceViews from '../../enhancers/enhanceViews'
import enhancePages from '../../enhancers/enhancePages'
import enhanceReferrers from '../../enhancers/enhanceReferrers'
import enhanceDetailedDurations from '../../enhancers/enhanceDetailedDurations'
import enhanceSystems from '../../enhancers/enhanceSystems'
import enhanceDevices from '../../enhancers/enhanceDevices'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import enhanceSizes from '../../enhancers/enhanceSizes'
import enhanceLanguages from '../../enhancers/enhanceLanguages'

const RouteDomain = (props) => {

	const domain = props.route.params.domain
	const domainId = domain.data.id
	const domainsFetching = props.domains.fetching
	const filterRange = props.filter.range

	useEffect(() => {

		props.fetchViews(props, domainId)
		props.fetchPages(props, domainId)
		props.fetchReferrers(props, domainId)
		props.fetchDurations(props, domainId)
		props.fetchSystems(props, domainId)
		props.fetchDevices(props, domainId)
		props.fetchBrowsers(props, domainId)
		props.fetchSizes(props, domainId)
		props.fetchLanguages(props, domainId)

	}, [ domainId, filterRange ])

	return (
		h(Fragment, {},

			h(CardViews, {
				wide: true,
				headline: 'Views',
				interval: props.views.interval,
				loading: domainsFetching || selectViewsValue(props, domainId).fetching,
				items: enhanceViews(selectViewsValue(props, domainId).value, 14, props.views.interval),
				onMore: () => props.setRoute(route.ROUTE_VIEWS)
			}),

			h(CardPages, {
				headline: 'Pages',
				range: filterRange,
				sorting: props.pages.sorting,
				loading: domainsFetching || selectPagesValue(props, domainId).fetching,
				items: enhancePages(selectPagesValue(props, domainId).value),
				onMore: () => props.setRoute(route.ROUTE_PAGES)
			}),

			h(CardReferrers, {
				headline: 'Referrers',
				range: filterRange,
				sorting: props.referrers.sorting,
				loading: domainsFetching || selectReferrersValue(props, domainId).fetching,
				items: enhanceReferrers(selectReferrersValue(props, domainId).value),
				onMore: () => props.setRoute(route.ROUTE_REFERRERS)
			}),

			h(CardDetailedDurations, {
				headline: 'Durations',
				range: filterRange,
				loading: domainsFetching || selectDurationsValue(props, domainId).fetching,
				items: enhanceDetailedDurations(selectDurationsValue(props, domainId).value),
				onMore: () => props.setRoute(route.ROUTE_DURATIONS)
			}),

			h(CardSystems, {
				headline: 'Systems',
				range: filterRange,
				sorting: props.systems.sorting,
				loading: domainsFetching || selectSystemsValue(props, domainId).fetching,
				items: enhanceSystems(selectSystemsValue(props, domainId).value),
				onMore: () => props.setRoute(route.ROUTE_SYSTEMS)
			}),

			h(CardDevices, {
				headline: 'Devices',
				range: filterRange,
				sorting: props.devices.sorting,
				loading: domainsFetching || selectDevicesValue(props, domainId).fetching,
				items: enhanceDevices(selectDevicesValue(props, domainId).value),
				onMore: () => props.setRoute(route.ROUTE_DEVICES)
			}),

			h(CardBrowsers, {
				headline: 'Browsers',
				range: filterRange,
				sorting: props.browsers.sorting,
				loading: domainsFetching || selectBrowsersValue(props, domainId).fetching,
				items: enhanceBrowsers(selectBrowsersValue(props, domainId).value),
				onMore: () => props.setRoute(route.ROUTE_BROWSERS)
			}),

			h(CardSizes, {
				headline: 'Sizes',
				range: filterRange,
				loading: domainsFetching || selectSizesValue(props, domainId).fetching,
				items: enhanceSizes(selectSizesValue(props, domainId).value),
				onMore: () => props.setRoute(route.ROUTE_SIZES)
			}),

			h(CardLanguages, {
				headline: 'Languages',
				range: filterRange,
				sorting: props.languages.sorting,
				loading: domainsFetching || selectLanguagesValue(props, domainId).fetching,
				items: enhanceLanguages(selectLanguagesValue(props, domainId).value),
				onMore: () => props.setRoute(route.ROUTE_LANGUAGES)
			})

		)
	)

}

export default RouteDomain
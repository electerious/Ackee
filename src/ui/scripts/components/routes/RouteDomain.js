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

import selectViewsValue from '../../selectors/selectViewsValue'
import selectPagesValue from '../../selectors/selectPagesValue'
import selectReferrersValue from '../../selectors/selectReferrersValue'
import selectDurationsValue from '../../selectors/selectDurationsValue'
import selectSystemsValue from '../../selectors/selectSystemsValue'
import selectDevicesValue from '../../selectors/selectDevicesValue'
import selectBrowsersValue from '../../selectors/selectBrowsersValue'
import selectSizesValue from '../../selectors/selectSizesValue'
import selectLanguagesValue from '../../selectors/selectLanguagesValue'
import selectRouteParams from '../../selectors/selectRouteParams'

import enhanceViews from '../../enhancers/enhanceViews'
import enhancePages from '../../enhancers/enhancePages'
import enhanceReferrers from '../../enhancers/enhanceReferrers'
import enhanceDetailedDurations from '../../enhancers/enhanceDetailedDurations'
import enhanceSystems from '../../enhancers/enhanceSystems'
import enhanceDevices from '../../enhancers/enhanceDevices'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import enhanceSizes from '../../enhancers/enhanceSizes'
import enhanceLanguages from '../../enhancers/enhanceLanguages'

import useDidMountEffect from '../../utils/useDidMountEffect'

const RouteDomain = (props) => {

	const domain = selectRouteParams(props).domain

	// if (domain == null) return null

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.fetchViews(props, domain.data.id)
		props.fetchPages(props, domain.data.id)
		props.fetchReferrers(props, domain.data.id)
		props.fetchDurations(props, domain.data.id)
		props.fetchSystems(props, domain.data.id)
		props.fetchDevices(props, domain.data.id)
		props.fetchBrowsers(props, domain.data.id)
		props.fetchSizes(props, domain.data.id)
		props.fetchLanguages(props, domain.data.id)

	}, [ domain.data.id, props.filter.range, props.domains.value ])

	return (
		h(Fragment, {},

			h(CardViews, {
				wide: true,
				headline: 'Views',
				interval: props.views.interval,
				loading: props.domains.fetching || selectViewsValue(props, domain.data.id).fetching,
				items: enhanceViews(selectViewsValue(props, domain.data.id).value, 14, props.views.interval)
			}),

			h(CardPages, {
				headline: 'Pages',
				range: props.filter.range,
				sorting: props.pages.sorting,
				loading: props.domains.fetching || selectPagesValue(props, domain.data.id).fetching,
				items: enhancePages(selectPagesValue(props, domain.data.id).value)
			}),

			h(CardReferrers, {
				headline: 'Referrers',
				range: props.filter.range,
				sorting: props.referrers.sorting,
				loading: props.domains.fetching || selectReferrersValue(props, domain.data.id).fetching,
				items: enhanceReferrers(selectReferrersValue(props, domain.data.id).value)
			}),

			h(CardDetailedDurations, {
				headline: 'Durations',
				range: props.filter.range,
				loading: props.domains.fetching || selectDurationsValue(props, domain.data.id).fetching,
				items: enhanceDetailedDurations(selectDurationsValue(props, domain.data.id).value)
			}),

			h(CardSystems, {
				headline: 'Systems',
				range: props.filter.range,
				sorting: props.systems.sorting,
				loading: props.domains.fetching || selectSystemsValue(props, domain.data.id).fetching,
				items: enhanceSystems(selectSystemsValue(props, domain.data.id).value)
			}),

			h(CardDevices, {
				headline: 'Devices',
				range: props.filter.range,
				sorting: props.devices.sorting,
				loading: props.domains.fetching || selectDevicesValue(props, domain.data.id).fetching,
				items: enhanceDevices(selectDevicesValue(props, domain.data.id).value)
			}),

			h(CardBrowsers, {
				headline: 'Browsers',
				range: props.filter.range,
				sorting: props.browsers.sorting,
				loading: props.domains.fetching || selectBrowsersValue(props, domain.data.id).fetching,
				items: enhanceBrowsers(selectBrowsersValue(props, domain.data.id).value)
			}),

			h(CardSizes, {
				headline: 'Sizes',
				range: props.filter.range,
				loading: props.domains.fetching || selectSizesValue(props, domain.data.id).fetching,
				items: enhanceSizes(selectSizesValue(props, domain.data.id).value)
			}),

			h(CardLanguages, {
				headline: 'Languages',
				range: props.filter.range,
				sorting: props.languages.sorting,
				loading: props.domains.fetching || selectLanguagesValue(props, domain.data.id).fetching,
				items: enhanceLanguages(selectLanguagesValue(props, domain.data.id).value)
			})

		)
	)

}

export default RouteDomain
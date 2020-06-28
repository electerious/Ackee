import { createElement as h, Fragment, useEffect } from 'react'

import selectBrowsersValue from '../../selectors/selectBrowsersValue'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import overviewRoute from '../../utils/overviewRoute'

import CardBrowsers from '../cards/CardBrowsers'

const RouteBrowsers = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchBrowsers(props, domain.id)
		})

	}, [ props.filter.range, props.domains.value, props.browsers.sorting, props.browsers.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardBrowsers, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.browsers.sorting,
						loading: props.domains.fetching || selectBrowsersValue(props, domain.id).fetching,
						items: enhanceBrowsers(selectBrowsersValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteBrowsers
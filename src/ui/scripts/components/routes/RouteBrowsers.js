import { createElement as h, Fragment, useEffect } from 'react'

import selectBrowsersValue from '../../selectors/selectBrowsersValue'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import domainRoute from '../../utils/domainRoute'

import CardBrowsers from '../cards/CardBrowsers'

const RouteBrowsers = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchBrowsers(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.browsers.sorting, props.browsers.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardBrowsers, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						sorting: props.browsers.sorting,
						loading: props.domains.fetching || selectBrowsersValue(props, domain.data.id).fetching,
						items: enhanceBrowsers(selectBrowsersValue(props, domain.data.id).value),
						onMore: () => props.setRoute(domainRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteBrowsers
import { createElement as h, Fragment, useEffect } from 'react'

import selectBrowsersValue from '../../selectors/selectBrowsersValue'
import enhanceBrowsers from '../../enhancers/enhanceBrowsers'
import overviewRoute from '../../utils/overviewRoute'

import CardBrowsers from '../cards/CardBrowsers'

const RouteBrowsers = (props) => {

	useEffect(() => {

		props.fetchBrowsers(props)

	}, [ props.filter.range, props.filter.sorting, props.browsers.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardBrowsers, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.filter.sorting,
						loading: props.browsers.fetching,
						items: enhanceBrowsers(selectBrowsersValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteBrowsers
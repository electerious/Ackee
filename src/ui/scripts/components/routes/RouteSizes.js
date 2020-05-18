import { createElement as h, Fragment, useEffect } from 'react'

import { ROUTE_DOMAIN } from '../../constants/route'
import selectSizesValue from '../../selectors/selectSizesValue'
import enhanceSizes from '../../enhancers/enhanceSizes'

import CardSizes from '../cards/CardSizes'

const RouteSizes = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchSizes(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.sizes.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardSizes, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						loading: props.domains.fetching || selectSizesValue(props, domain.data.id).fetching,
						items: enhanceSizes(selectSizesValue(props, domain.data.id).value),
						onMore: () => props.setRouteValue({ ...ROUTE_DOMAIN, params: { domain } })
					})
				)
			)

		)
	)

}

export default RouteSizes
import { createElement as h, Fragment, useEffect } from 'react'

import selectSizesValue from '../../selectors/selectSizesValue'
import enhanceSizes from '../../enhancers/enhanceSizes'
import overviewRoute from '../../utils/overviewRoute'

import CardSizes from '../cards/CardSizes'

const RouteSizes = (props) => {

	useEffect(() => {

		props.fetchSizes(props)

	}, [ props.filter.range, props.filter.sorting, props.sizes.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardSizes, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.filter.sorting,
						loading: props.sizes.fetching,
						items: enhanceSizes(selectSizesValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteSizes
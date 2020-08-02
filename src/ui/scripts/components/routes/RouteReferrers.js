import { createElement as h, Fragment, useEffect } from 'react'

import selectReferrersValue from '../../selectors/selectReferrersValue'
import enhanceReferrers from '../../enhancers/enhanceReferrers'
import overviewRoute from '../../utils/overviewRoute'

import CardReferrers from '../cards/CardReferrers'

const RouteReferrers = (props) => {

	useEffect(() => {

		props.fetchReferrers(props)

	}, [ props.filter.range, props.filter.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardReferrers, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.filter.sorting,
						loading: props.referrers.fetching,
						items: enhanceReferrers(selectReferrersValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteReferrers
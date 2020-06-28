import { createElement as h, Fragment, useEffect } from 'react'

import selectReferrersValue from '../../selectors/selectReferrersValue'
import enhanceReferrers from '../../enhancers/enhanceReferrers'
import overviewRoute from '../../utils/overviewRoute'

import CardReferrers from '../cards/CardReferrers'

const RouteReferrers = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchReferrers(props, domain.id)
		})

	}, [ props.filter.range, props.domains.value, props.referrers.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardReferrers, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.referrers.sorting,
						loading: props.domains.fetching || selectReferrersValue(props, domain.id).fetching,
						items: enhanceReferrers(selectReferrersValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteReferrers
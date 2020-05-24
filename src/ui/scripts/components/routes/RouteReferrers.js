import { createElement as h, Fragment, useEffect } from 'react'

import { ROUTE_DOMAIN } from '../../constants/route'
import selectReferrersValue from '../../selectors/selectReferrersValue'
import enhanceReferrers from '../../enhancers/enhanceReferrers'

import CardReferrers from '../cards/CardReferrers'

const RouteReferrers = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchReferrers(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.referrers.sorting ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardReferrers, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						sorting: props.referrers.sorting,
						loading: props.domains.fetching || selectReferrersValue(props, domain.data.id).fetching,
						items: enhanceReferrers(selectReferrersValue(props, domain.data.id).value),
						onMore: () => props.setRoute({ ...ROUTE_DOMAIN, params: { domain: domain.data.id } })
					})
				)
			)

		)
	)

}

export default RouteReferrers
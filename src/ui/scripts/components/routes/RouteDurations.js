import { createElement as h, Fragment, useEffect } from 'react'

import selectDurationsValue from '../../selectors/selectDurationsValue'
import enhanceDurations from '../../enhancers/enhanceDurations'
import mergeDurations from '../../utils/mergeDurations'
import overviewRoute from '../../utils/overviewRoute'

import CardDurations from '../cards/CardDurations'

const RouteDurations = (props) => {

	useEffect(() => {

		props.fetchDurations(props)

	}, [ props.filter.interval ])

	return (
		h(Fragment, {},
			h(CardDurations, {
				wide: true,
				headline: 'Durations',
				interval: props.filter.interval,
				loading: props.fetching,
				items: mergeDurations(props)
			}),

			props.domains.value.map(
				(domain) => (
					h(CardDurations, {
						key: domain.id,
						headline: domain.title,
						interval: props.filter.interval,
						loading: props.durations.fetching,
						items: enhanceDurations(selectDurationsValue(props, domain.id).value, 7),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)
		)
	)

}

export default RouteDurations
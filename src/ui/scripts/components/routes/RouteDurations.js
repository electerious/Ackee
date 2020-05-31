import { createElement as h, Fragment, useEffect } from 'react'

import selectDurationsValue from '../../selectors/selectDurationsValue'
import enhanceAverageDurations from '../../enhancers/enhanceAverageDurations'
import mergeAverageDurations from '../../utils/mergeAverageDurations'
import overviewRoute from '../../utils/overviewRoute'

import CardAverageDurations from '../cards/CardAverageDurations'

const RouteDurations = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchDurations(props, domain.data.id)
		})

	}, [ props.filter.interval, props.domains.value ])

	return (
		h(Fragment, {},
			h(CardAverageDurations, {
				wide: true,
				headline: 'Average Durations',
				interval: props.filter.interval,
				loading: props.fetching,
				items: mergeAverageDurations(props)
			}),

			props.domains.value.map(
				(domain) => (
					h(CardAverageDurations, {
						key: domain.data.id,
						headline: domain.data.title,
						interval: props.filter.interval,
						loading: props.domains.fetching || selectDurationsValue(props, domain.data.id).fetching,
						items: enhanceAverageDurations(selectDurationsValue(props, domain.data.id).value, 7, props.filter.interval),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)
		)
	)

}

export default RouteDurations
import { createElement as h, Fragment, useEffect } from 'react'

import { DURATIONS_TYPE_AVERAGE, DURATIONS_TYPE_DETAILED } from '../../../../constants/durations'

import selectDurationsValue from '../../selectors/selectDurationsValue'
import enhanceAverageDurations from '../../enhancers/enhanceAverageDurations'
import enhanceDetailedDurations from '../../enhancers/enhanceDetailedDurations'
import mergeAverageDurations from '../../utils/mergeAverageDurations'
import overviewRoute from '../../utils/overviewRoute'

import CardAverageDurations from '../cards/CardAverageDurations'
import CardDetailedDurations from '../cards/CardDetailedDurations'

const RouteDurations = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchDurations(props, domain.data.id)
		})

	}, [ props.filter.range, props.filter.interval, props.domains.value, props.durations.type ])

	const type = props.durations.type

	if (type === DURATIONS_TYPE_AVERAGE) return (
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

	if (type === DURATIONS_TYPE_DETAILED) return (
		props.domains.value.map(
			(domain) => (
				h(CardDetailedDurations, {
					key: domain.data.id,
					headline: domain.data.title,
					range: props.filter.range,
					loading: props.domains.fetching || selectDurationsValue(props, domain.data.id).fetching,
					items: enhanceDetailedDurations(selectDurationsValue(props, domain.data.id).value),
					onMore: () => props.setRoute(overviewRoute(domain))
				})
			)
		)
	)

}

export default RouteDurations
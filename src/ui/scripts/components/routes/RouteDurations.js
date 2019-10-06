import { createElement as h, Fragment, useEffect } from 'react'

import {
	// DURATIONS_TYPE_AVERAGE,
	DURATIONS_TYPE_TOTAL
} from '../../../../constants/durations'

import enhanceDurations from '../../utils/enhanceDurations'

import CardDurations from '../cards/CardDurations'
import Select from '../Select'

const RouteDurations = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchDurations(props, domain.data.id)
		})

	}, [ props.domains.value, props.durations.type ])

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.durations.type,
					onChange: (e) => props.setDurationsType(e.target.value),
					items: [
						// { value: DURATIONS_TYPE_AVERAGE, label: 'Unique durations' },
						{ value: DURATIONS_TYPE_TOTAL, label: 'Total durations' }
					]
				})
			),

			props.domains.value.map(
				(domain) => (
					h(CardDurations, {
						key: domain.data.id,
						headline: domain.data.title,
						loading: props.durations.value[domain.data.id] == null ? false : props.durations.value[domain.data.id].fetching,
						items: props.durations.value[domain.data.id] == null ? [] : enhanceDurations(props.durations.value[domain.data.id].value)
					})
				)
			)

		)
	)

}

export default RouteDurations
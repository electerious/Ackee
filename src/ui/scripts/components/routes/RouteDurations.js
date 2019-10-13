import { createElement as h, Fragment, useEffect } from 'react'

import {
	DURATIONS_TYPE_AVERAGE,
	DURATIONS_TYPE_DETAILED
} from '../../../../constants/durations'

import enhanceAverageDurations from '../../utils/enhanceAverageDurations'
import enhanceDetailedDurations from '../../utils/enhanceDetailedDurations'
import mergeAverageDurations from '../../utils/mergeAverageDurations'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardAverageDurations from '../cards/CardAverageDurations'
import CardDetailedDurations from '../cards/CardDetailedDurations'
import Select from '../Select'

const RouteDurations = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchDurations(props, domain.data.id)
		})

	}, [ props.domains.value, props.durations.type ])

	const content = (() => {

		const type = props.durations.type

		if (type === DURATIONS_TYPE_AVERAGE) return (
			h(Fragment, {},
				h(CardAverageDurations, {
					wide: true,
					headline: 'Average Durations',
					items: mergeAverageDurations(props.domains, props.durations)
				}),

				props.domains.value.map(
					(domain) => (
						h(CardAverageDurations, {
							key: domain.data.id,
							headline: domain.data.title,
							items: props.durations.value[domain.data.id] == null ? [] : enhanceAverageDurations(props.durations.value[domain.data.id].value, 7)
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
						loading: props.durations.value[domain.data.id] == null ? false : props.durations.value[domain.data.id].fetching,
						items: props.durations.value[domain.data.id] == null ? [] : enhanceDetailedDurations(props.durations.value[domain.data.id].value)
					})
				)
			)
		)

	})()

	return (
		h(Fragment, {},

			h('div', { className: 'subHeader' },
				h(Select, {
					value: props.durations.type,
					onChange: (e) => props.setDurationsType(e.target.value),
					items: [
						{ value: DURATIONS_TYPE_AVERAGE, label: 'Average durations' },
						{ value: DURATIONS_TYPE_DETAILED, label: 'Detailed durations' }
					]
				})
			),

			content

		)
	)

}

export default RouteDurations
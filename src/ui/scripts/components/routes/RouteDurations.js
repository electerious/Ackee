import { createElement as h, Fragment, useEffect } from 'react'

import { DURATIONS_TYPE_AVERAGE, DURATIONS_TYPE_DETAILED } from '../../../../constants/durations'

import enhanceAverageDurations from '../../enhancers/enhanceAverageDurations'
import enhanceDetailedDurations from '../../enhancers/enhanceDetailedDurations'
import mergeAverageDurations from '../../utils/mergeAverageDurations'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardAverageDurations from '../cards/CardAverageDurations'
import CardDetailedDurations from '../cards/CardDetailedDurations'
import NoDomain from '../NoDomain'

const RouteDurations = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchDurations(props, domain.data.id)
		})

	}, [ props.domains.value, props.durations.type ])

	const type = props.durations.type

	const mainView = (() => {
		if (props.domains.value.length > 0) {
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
		}

		if (!props.fetching) {
			return h(NoDomain, {
				addModalsModal: props.addModalsModal
			})
		}
	})()

	return (h(Fragment, {},	mainView))

}

export default RouteDurations
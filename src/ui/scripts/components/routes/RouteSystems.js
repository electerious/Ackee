import { createElement as h, Fragment, useEffect } from 'react'

import enhanceSystems from '../../enhancers/enhanceSystems'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardSystems from '../cards/CardSystems'
import NoDomain from '../NoDomain'


const RouteSystems = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchSystems(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.systems.sorting, props.systems.type ])

	const mainView = (() => {
		if (props.domains.value.length > 0) {
			return (
				props.domains.value.map(
					(domain) => (
						h(CardSystems, {
							key: domain.data.id,
							headline: domain.data.title,
							range: props.filter.range,
							sorting: props.systems.sorting,
							loading: props.systems.value[domain.data.id] == null ? false : props.systems.value[domain.data.id].fetching,
							items: props.systems.value[domain.data.id] == null ? [] : enhanceSystems(props.systems.value[domain.data.id].value)
						})
					)
				)
			)

		}

		return h(NoDomain, {
			addModalsModal: props.addModalsModal
		})

	})()

	return (
		h(Fragment, {}, mainView)
	)

}

export default RouteSystems
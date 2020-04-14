import { createElement as h, Fragment, useEffect } from 'react'

import enhanceSystems from '../../enhancers/enhanceSystems'
import useDidMountEffect from '../../utils/useDidMountEffect'

import CardSystems from '../cards/CardSystems'

const RouteSystems = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	useDidMountEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchSystems(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.systems.sorting, props.systems.type ])

	return (
		h(Fragment, {},

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
	)

}

export default RouteSystems
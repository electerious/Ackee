import { createElement as h, Fragment, useEffect } from 'react'

import selectSystemsValue from '../../selectors/selectSystemsValue'
import enhanceSystems from '../../enhancers/enhanceSystems'

import CardSystems from '../cards/CardSystems'

const RouteSystems = (props) => {

	useEffect(() => {

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
						loading: props.domains.fetching || selectSystemsValue(props, domain.data.id).fetching,
						items: enhanceSystems(selectSystemsValue(props, domain.data.id).value)
					})
				)
			)

		)
	)

}

export default RouteSystems
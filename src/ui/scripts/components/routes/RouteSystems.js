import { createElement as h, Fragment, useEffect } from 'react'

import selectSystemsValue from '../../selectors/selectSystemsValue'
import enhanceSystems from '../../enhancers/enhanceSystems'
import overviewRoute from '../../utils/overviewRoute'

import CardSystems from '../cards/CardSystems'

const RouteSystems = (props) => {

	useEffect(() => {

		props.fetchSystems(props)

	}, [ props.filter.range, props.filter.sorting, props.systems.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardSystems, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.filter.sorting,
						loading: props.systems.fetching,
						items: enhanceSystems(selectSystemsValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteSystems
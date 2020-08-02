import { createElement as h, Fragment, useEffect } from 'react'

import selectDevicesValue from '../../selectors/selectDevicesValue'
import enhanceDevices from '../../enhancers/enhanceDevices'
import overviewRoute from '../../utils/overviewRoute'

import CardDevices from '../cards/CardDevices'

const RouteDevices = (props) => {

	useEffect(() => {

		props.fetchDevices(props)

	}, [ props.filter.range, props.filter.sorting, props.devices.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardDevices, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.filter.sorting,
						loading: props.devices.fetching,
						items: enhanceDevices(selectDevicesValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteDevices
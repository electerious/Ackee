import { createElement as h, Fragment, useEffect } from 'react'

import selectDevicesValue from '../../selectors/selectDevicesValue'
import enhanceDevices from '../../enhancers/enhanceDevices'
import overviewRoute from '../../utils/overviewRoute'

import CardDevices from '../cards/CardDevices'

const RouteDevices = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchDevices(props, domain.id)
		})

	}, [ props.filter.range, props.domains.value, props.filter.sorting, props.devices.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardDevices, {
						key: domain.id,
						headline: domain.title,
						range: props.filter.range,
						sorting: props.filter.sorting,
						loading: props.domains.fetching || selectDevicesValue(props, domain.id).fetching,
						items: enhanceDevices(selectDevicesValue(props, domain.id).value),
						onMore: () => props.setRoute(overviewRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteDevices
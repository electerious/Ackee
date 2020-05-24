import { createElement as h, Fragment, useEffect } from 'react'

import selectDevicesValue from '../../selectors/selectDevicesValue'
import enhanceDevices from '../../enhancers/enhanceDevices'
import domainRoute from '../../utils/domainRoute'

import CardDevices from '../cards/CardDevices'

const RouteDevices = (props) => {

	useEffect(() => {

		props.domains.value.map((domain) => {
			props.fetchDevices(props, domain.data.id)
		})

	}, [ props.filter.range, props.domains.value, props.devices.sorting, props.devices.type ])

	return (
		h(Fragment, {},

			props.domains.value.map(
				(domain) => (
					h(CardDevices, {
						key: domain.data.id,
						headline: domain.data.title,
						range: props.filter.range,
						sorting: props.devices.sorting,
						loading: props.domains.fetching || selectDevicesValue(props, domain.data.id).fetching,
						items: enhanceDevices(selectDevicesValue(props, domain.data.id).value),
						onMore: () => props.setRoute(domainRoute(domain))
					})
				)
			)

		)
	)

}

export default RouteDevices
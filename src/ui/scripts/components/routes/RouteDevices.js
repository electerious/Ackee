import { createElement as h } from 'react'

import devicesLoader from '../../loaders/devicesLoader'
import useDomainWidgets from '../../hooks/useDomainWidgets'

const RouteDevices = (props) => {

	return useDomainWidgets(props, devicesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.devicesType
	})

}

export default RouteDevices
import { createElement as h } from 'react'

import devicesLoader from '../../loaders/devicesLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteDevices = (props) => {

	return useWidgetsForDomains(props, devicesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.devicesType
	})

}

export default RouteDevices
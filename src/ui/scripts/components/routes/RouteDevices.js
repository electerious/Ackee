import { createElement as h } from 'react'

import devicesLoader from '../../loaders/devicesLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteDevices = (props) => {

	return useWidgetsForDomains(props, devicesLoader, {
		sorting: props.filter.sorting,
		type: props.filter.devicesType,
		range: props.filter.range
	})

}

export default RouteDevices
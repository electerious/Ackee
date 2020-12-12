import { createElement as h } from 'react'

import devicesLoader from '../../loaders/devicesLoader'
import useCardWidgetsForDomains from '../../hooks/useCardWidgetsForDomains'

const RouteDevices = (props) => {

	return useCardWidgetsForDomains(props, devicesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.devicesType
	})

}

export default RouteDevices
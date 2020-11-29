import { createElement as h } from 'react'

import devicesLoader from '../../loaders/devicesLoader'
import useWidgets from '../../utils/useWidgets'

const RouteDevices = (props) => {

	const { renderedWidgets } = useWidgets(props, devicesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.devicesType
	})

	return renderedWidgets

}

export default RouteDevices
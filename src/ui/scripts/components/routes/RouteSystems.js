import { createElement as h } from 'react'

import systemsLoader from '../../loaders/systemsLoader'
import useWidgets from '../../utils/useWidgets'

const RouteSystems = (props) => {

	const { renderedWidgets } = useWidgets(props, systemsLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.systemsType
	})

	return renderedWidgets

}

export default RouteSystems
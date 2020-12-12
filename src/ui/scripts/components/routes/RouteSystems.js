import { createElement as h } from 'react'

import systemsLoader from '../../loaders/systemsLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteSystems = (props) => {

	return useWidgetsForDomains(props, systemsLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.systemsType
	})

}

export default RouteSystems
import { createElement as h } from 'react'

import systemsLoader from '../../loaders/systemsLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteSystems = (props) => {

	return useWidgetsForDomains(props, systemsLoader, {
		sorting: props.filter.sorting,
		type: props.filter.systemsType,
		range: props.filter.range
	})

}

export default RouteSystems
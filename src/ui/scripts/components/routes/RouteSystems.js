import { createElement as h } from 'react'

import systemsLoader from '../../loaders/systemsLoader'
import useCardWidgetsForDomains from '../../hooks/useCardWidgetsForDomains'

const RouteSystems = (props) => {

	return useCardWidgetsForDomains(props, systemsLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.systemsType
	})

}

export default RouteSystems
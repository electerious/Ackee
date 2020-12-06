import { createElement as h } from 'react'

import systemsLoader from '../../loaders/systemsLoader'
import useDomainWidgets from '../../utils/useDomainWidgets'

const RouteSystems = (props) => {

	return useDomainWidgets(props, systemsLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.systemsType
	})

}

export default RouteSystems
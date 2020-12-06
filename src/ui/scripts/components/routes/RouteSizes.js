import { createElement as h } from 'react'

import sizesLoader from '../../loaders/sizesLoader'
import useDomainWidgets from '../../hooks/useDomainWidgets'

const RouteSizes = (props) => {

	return useDomainWidgets(props, sizesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.sizesType
	})

}

export default RouteSizes
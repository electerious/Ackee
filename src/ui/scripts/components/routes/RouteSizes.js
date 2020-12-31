import { createElement as h } from 'react'

import sizesLoader from '../../loaders/sizesLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteSizes = (props) => {

	return useWidgetsForDomains(props, sizesLoader, {
		sorting: props.filter.sorting,
		type: props.filter.sizesType,
		range: props.filter.range
	})

}

export default RouteSizes
import { createElement as h } from 'react'

import sizesLoader from '../../loaders/sizesLoader'
import useCardWidgetsForDomains from '../../hooks/useCardWidgetsForDomains'

const RouteSizes = (props) => {

	return useCardWidgetsForDomains(props, sizesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.sizesType
	})

}

export default RouteSizes
import { createElement as h } from 'react'

import sizesLoader from '../../loaders/sizesLoader'
import useWidgets from '../../utils/useWidgets'

const RouteSizes = (props) => {

	return useWidgets(props, sizesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.sizesType
	})

}

export default RouteSizes
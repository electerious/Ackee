import { createElement as h } from 'react'

import sizesLoader from '../../loaders/sizesLoader'
import useWidgets from '../../utils/useWidgets'

const RouteSizes = (props) => {

	const { renderedWidgets } = useWidgets(props, sizesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.sizesType
	})

	return renderedWidgets

}

export default RouteSizes
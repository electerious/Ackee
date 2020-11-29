import { createElement as h } from 'react'

import browsersLoader from '../../loaders/browsersLoader'
import useWidgets from '../../utils/useWidgets'

const RouteBrowsers = (props) => {

	const { renderedWidgets } = useWidgets(props, browsersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.browsersType
	})

	return renderedWidgets

}

export default RouteBrowsers
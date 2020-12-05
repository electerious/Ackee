import { createElement as h } from 'react'

import browsersLoader from '../../loaders/browsersLoader'
import useWidgets from '../../utils/useWidgets'

const RouteBrowsers = (props) => {

	return useWidgets(props, browsersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.browsersType
	})

}

export default RouteBrowsers
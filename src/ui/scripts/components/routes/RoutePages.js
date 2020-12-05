import { createElement as h } from 'react'

import pagesLoader from '../../loaders/pagesLoader'
import useWidgets from '../../utils/useWidgets'

const RoutePages = (props) => {

	return useWidgets(props, pagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RoutePages
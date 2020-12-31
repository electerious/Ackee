import { createElement as h } from 'react'

import pagesLoader from '../../loaders/pagesLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RoutePages = (props) => {

	return useWidgetsForDomains(props, pagesLoader, {
		sorting: props.filter.sorting,
		range: props.filter.range
	})

}

export default RoutePages
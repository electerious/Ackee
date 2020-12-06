import { createElement as h } from 'react'

import pagesLoader from '../../loaders/pagesLoader'
import useDomainWidgets from '../../hooks/useDomainWidgets'

const RoutePages = (props) => {

	return useDomainWidgets(props, pagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RoutePages
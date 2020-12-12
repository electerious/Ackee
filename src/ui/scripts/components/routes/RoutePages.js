import { createElement as h } from 'react'

import pagesLoader from '../../loaders/pagesLoader'
import useCardWidgetsForDomains from '../../hooks/useCardWidgetsForDomains'

const RoutePages = (props) => {

	return useCardWidgetsForDomains(props, pagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RoutePages
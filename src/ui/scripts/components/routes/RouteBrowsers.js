import { createElement as h } from 'react'

import browsersLoader from '../../loaders/browsersLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteBrowsers = (props) => {

	return useWidgetsForDomains(props, browsersLoader, {
		sorting: props.filter.sorting,
		type: props.filter.browsersType,
		range: props.filter.range
	})

}

export default RouteBrowsers
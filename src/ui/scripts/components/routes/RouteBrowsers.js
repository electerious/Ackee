import { createElement as h } from 'react'

import browsersLoader from '../../loaders/browsersLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteBrowsers = (props) => {

	return useWidgetsForDomains(props, browsersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.browsersType
	})

}

export default RouteBrowsers
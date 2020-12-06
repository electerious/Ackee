import { createElement as h } from 'react'

import browsersLoader from '../../loaders/browsersLoader'
import useDomainWidgets from '../../hooks/useDomainWidgets'

const RouteBrowsers = (props) => {

	return useDomainWidgets(props, browsersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.browsersType
	})

}

export default RouteBrowsers
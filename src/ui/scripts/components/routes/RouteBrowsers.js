import { createElement as h } from 'react'

import browsersLoader from '../../loaders/browsersLoader'
import useCardWidgetsForDomains from '../../hooks/useCardWidgetsForDomains'

const RouteBrowsers = (props) => {

	return useCardWidgetsForDomains(props, browsersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.browsersType
	})

}

export default RouteBrowsers
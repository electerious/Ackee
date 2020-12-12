import { createElement as h } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import useCardWidgetsForDomains from '../../hooks/useCardWidgetsForDomains'

const RouteLanguages = (props) => {

	return useCardWidgetsForDomains(props, languagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RouteLanguages
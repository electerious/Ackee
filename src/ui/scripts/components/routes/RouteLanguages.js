import { createElement as h } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteLanguages = (props) => {

	return useWidgetsForDomains(props, languagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RouteLanguages
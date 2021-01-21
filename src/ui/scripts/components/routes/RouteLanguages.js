import { createElement as h } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteLanguages = (props) => {

	return useWidgetsForDomains(props, languagesLoader, {
		sorting: props.filter.sorting,
		range: props.filter.range
	})

}

export default RouteLanguages
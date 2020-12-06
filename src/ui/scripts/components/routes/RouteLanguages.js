import { createElement as h } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import useDomainWidgets from '../../utils/useDomainWidgets'

const RouteLanguages = (props) => {

	return useDomainWidgets(props, languagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RouteLanguages
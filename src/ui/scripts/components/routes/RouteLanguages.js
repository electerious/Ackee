import { createElement as h } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import useWidgets from '../../utils/useWidgets'

const RouteLanguages = (props) => {

	return useWidgets(props, languagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RouteLanguages
import { createElement as h } from 'react'

import languagesLoader from '../../loaders/languagesLoader'
import useWidgets from '../../utils/useWidgets'

const RouteLanguages = (props) => {

	const { renderedWidgets } = useWidgets(props, languagesLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

	return renderedWidgets

}

export default RouteLanguages
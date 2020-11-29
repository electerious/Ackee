import { createElement as h } from 'react'

import referrersLoader from '../../loaders/referrersLoader'
import useWidgets from '../../utils/useWidgets'

const RouteReferrers = (props) => {

	const { renderedWidgets } = useWidgets(props, referrersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

	return renderedWidgets

}

export default RouteReferrers
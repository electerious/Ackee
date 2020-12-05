import { createElement as h } from 'react'

import referrersLoader from '../../loaders/referrersLoader'
import useWidgets from '../../utils/useWidgets'

const RouteReferrers = (props) => {

	return useWidgets(props, referrersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RouteReferrers
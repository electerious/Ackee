import { createElement as h } from 'react'

import referrersLoader from '../../loaders/referrersLoader'
import useWidgetsForDomains from '../../hooks/useWidgetsForDomains'

const RouteReferrers = (props) => {

	return useWidgetsForDomains(props, referrersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting,
		type: props.filter.referrersType
	})

}

export default RouteReferrers
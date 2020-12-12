import { createElement as h } from 'react'

import referrersLoader from '../../loaders/referrersLoader'
import useCardWidgetsForDomains from '../../hooks/useCardWidgetsForDomains'

const RouteReferrers = (props) => {

	return useCardWidgetsForDomains(props, referrersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RouteReferrers
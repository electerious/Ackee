import { createElement as h } from 'react'

import referrersLoader from '../../loaders/referrersLoader'
import useDomainWidgets from '../../hooks/useDomainWidgets'

const RouteReferrers = (props) => {

	return useDomainWidgets(props, referrersLoader, {
		range: props.filter.range,
		sorting: props.filter.sorting
	})

}

export default RouteReferrers
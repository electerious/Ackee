import { createElement as h } from 'react'

import useWidgetsForEvents from '../../hooks/useWidgetsForEvents'

const RouteEvents = (props) => {

	return useWidgetsForEvents(props, {
		interval: props.filter.interval,
		sorting: props.filter.sorting,
		range: props.filter.range
	})

}

export default RouteEvents
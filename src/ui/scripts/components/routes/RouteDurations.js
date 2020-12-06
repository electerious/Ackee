import { createElement as h, Fragment } from 'react'

import mergedDurationsLoader from '../../loaders/mergedDurationsLoader'
import durationsLoader from '../../loaders/durationsLoader'
import useMergedWidget from '../../utils/useMergedWidget'
import useWidgets from '../../utils/useWidgets'

const RouteDurations = (props) => {

	const renderedMergedWidget = useMergedWidget(props, mergedDurationsLoader, {
		interval: props.filter.interval
	}, {
		wide: true,
		headline: () => 'Durations'
	})

	const renderedWidgets = useWidgets(props, durationsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	})

	return (
		h(Fragment, {},
			renderedMergedWidget,
			renderedWidgets
		)
	)

}

export default RouteDurations
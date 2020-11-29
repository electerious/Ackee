import { createElement as h, Fragment } from 'react'

import CardChart from '../cards/CardChart'

import durationsLoader from '../../loaders/durationsLoader'
import mergeDurations from '../../utils/mergeDurations'
import useWidgets from '../../utils/useWidgets'
import formatDuration from '../../utils/formatDuration'

const RouteDurations = (props) => {

	const { rawWidgets, renderedWidgets } = useWidgets(props, durationsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	})

	return (
		h(Fragment, {},
			h(CardChart, {
				wide: true,
				headline: 'Durations',
				interval: props.filter.interval,
				items: mergeDurations(rawWidgets),
				formatter: (ms) => formatDuration(ms).toString()
			}),

			renderedWidgets
		)
	)

}

export default RouteDurations
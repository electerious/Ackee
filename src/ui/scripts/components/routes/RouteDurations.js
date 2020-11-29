import { createElement as h, Fragment } from 'react'

import durationsLoader from '../../loaders/durationsLoader'
import mergeDurations from '../../utils/mergeDurations'
import useWidgets from '../../utils/useWidgets'

import CardDurations from '../cards/CardDurations'

const RouteDurations = (props) => {

	const { rawWidgets, renderedWidgets } = useWidgets(props, durationsLoader, {
		interval: props.filter.interval,
		type: props.filter.viewsType
	})

	return (
		h(Fragment, {},
			h(CardDurations, {
				wide: true,
				headline: 'Durations',
				interval: props.filter.interval,
				loading: props.fetching,
				items: mergeDurations(rawWidgets)
			}),

			renderedWidgets
		)
	)

}

export default RouteDurations
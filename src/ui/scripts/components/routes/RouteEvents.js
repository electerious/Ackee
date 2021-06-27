import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import * as events from '../../../../constants/events'

import useEvents from '../../api/hooks/events/useEvents'
import useEventChartEntries from '../../api/hooks/events/useEventChart'
import useEventListEntries from '../../api/hooks/events/useEventList'

import CardStatistics from '../cards/CardStatistics'
import RendererEventChart from '../renderers/RendererEventChart'
import RendererList from '../renderers/RendererList'

const cardProps = (event, props) => {
	switch (event.type) {
		case events.EVENTS_TYPE_TOTAL_CHART:
		case events.EVENTS_TYPE_AVERAGE_CHART:
			return {
				hook: useEventChartEntries,
				hookArgs: [
					event.id,
					{
						interval: props.filters.interval,
						type: event.type === events.EVENTS_TYPE_AVERAGE_CHART ? 'AVERAGE' : 'TOTAL',
						limit: 7,
					},
				],
				renderer: RendererEventChart,
				rendererProps: {
					interval: props.filters.interval,
				},
			}
		case events.EVENTS_TYPE_TOTAL_LIST:
		case events.EVENTS_TYPE_AVERAGE_LIST:
			return {
				hook: useEventListEntries,
				hookArgs: [
					event.id,
					{
						sorting: props.filters.sorting,
						type: event.type === events.EVENTS_TYPE_AVERAGE_LIST ? 'AVERAGE' : 'TOTAL',
						range: props.filters.range,
					},
				],
				renderer: RendererList,
				rendererProps: {
					sorting: props.filters.sorting,
					range: props.filters.range,
				},
			}
	}
}

const RouteEvents = (props) => {
	const events = useEvents()

	return events.value.map((event) => {
		return h(CardStatistics, {
			key: event.id,
			headline: event.title,
			...cardProps(event, props),
		})
	})
}

RouteEvents.propTypes = {
	filters: PropTypes.object.isRequired,
}

export default RouteEvents
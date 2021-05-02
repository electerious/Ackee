import { createElement as h, Fragment } from 'react'

import * as events from '../../../../constants/events'

import useEvents from '../../api/hooks/events/useEvents'
import useEventChartEntries from '../../api/hooks/events/useEventChart'
import useEventListEntries from '../../api/hooks/events/useEventList'

import CardWidget from '../cards/CardWidget'
import RendererEventChart from '../renderers/RendererEventChart'
import RendererList from '../renderers/RendererList'

const widgetProps = (event, props) => {
	switch (event.type) {
		case events.EVENTS_TYPE_TOTAL_CHART:
		case events.EVENTS_TYPE_AVERAGE_CHART:
			return {
				hook: useEventChartEntries,
				hookArgs: [
					event.id,
					{
						interval: props.filter.interval,
						type: event.type === events.EVENTS_TYPE_AVERAGE_CHART ? 'AVERAGE' : 'TOTAL',
						limit: 7
					}
				],
				renderer: RendererEventChart,
				rendererProps: {
					interval: props.filter.interval
				}
			}
		case events.EVENTS_TYPE_TOTAL_LIST:
		case events.EVENTS_TYPE_AVERAGE_LIST:
			return {
				hook: useEventListEntries,
				hookArgs: [
					event.id,
					{
						sorting: props.filter.sorting,
						type: event.type === events.EVENTS_TYPE_AVERAGE_LIST ? 'AVERAGE' : 'TOTAL',
						range: props.filter.range
					}
				],
				renderer: RendererList,
				rendererProps: {
					sorting: props.filter.sorting,
					range: props.filter.range
				}
			}
	}
}

const RouteEvents = (props) => {

	const events = useEvents()

	return (
		h(Fragment, {},
			events.value.map((event) => {
				return h(CardWidget, {
					key: event.id,
					headline: event.title,
					...widgetProps(event, props)
				})
			})
		)
	)

}

export default RouteEvents
import { createElement as h, useMemo } from 'react'

import * as events from '../../../constants/events'

import eventChartEntriesLoader from '../loaders/eventChartEntriesLoader'
import eventListEntriesLoader from '../loaders/eventListEntriesLoader'

import useWidgets from './useWidgets'

const selectLoader = (eventId, eventType, opts) => {
	switch (eventType) {
		case events.EVENTS_TYPE_TOTAL_CHART:
		case events.EVENTS_TYPE_AVERAGE_CHART:
			return eventChartEntriesLoader(eventId, {
				type: eventType === events.EVENTS_TYPE_AVERAGE_CHART ? 'AVERAGE' : 'TOTAL',
				interval: opts.interval
			})
		case events.EVENTS_TYPE_TOTAL_LIST:
		case events.EVENTS_TYPE_AVERAGE_LIST:
			return eventListEntriesLoader(eventId, {
				sorting: opts.sorting,
				type: eventType === events.EVENTS_TYPE_AVERAGE_LIST ? 'AVERAGE' : 'TOTAL',
				range: opts.range
			})
	}
}

export default (props, opts) => {

	const widgetConfigs = useMemo(() => {

		return props.events.value.map((event) => ({
			key: event.id,
			loader: selectLoader(event.id, event.type, opts),
			additionalProps: {
				headline: event.title
			}
		}))

	}, [ props.events.value, ...Object.values(opts) ])

	return useWidgets(props, widgetConfigs)

}
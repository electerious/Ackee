import { createElement as h, useMemo } from 'react'

import { EVENTS_TYPE_CHART, EVENTS_TYPE_LIST } from '../../../constants/events'

import eventChartEntriesLoader from '../loaders/eventChartEntriesLoader'
import eventListEntriesLoader from '../loaders/eventListEntriesLoader'

import useWidgets from './useWidgets'

const selectLoader = (eventId, eventType, opts) => {
	switch (eventType) {
		case EVENTS_TYPE_CHART:
			return eventChartEntriesLoader(eventId, {
				interval: opts.interval
			})
		case EVENTS_TYPE_LIST:
			return eventListEntriesLoader(eventId, {
				sorting: opts.sorting,
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
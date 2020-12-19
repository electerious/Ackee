import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceEventChartEntries from '../enhancers/enhanceEventChartEntries'
import formatNumber from '../utils/formatNumber'
import createWidgetId from '../utils/createWidgetId'

const EventEntriesChartRenderer = (props) => h(RendererChart, {
	...props,
	formatter: formatNumber
})

export default (eventId, opts) => {

	const id = createWidgetId('fetchEventsChart', eventId, opts)

	const query = `
		event(id: "${ eventId }") {
			statistics {
				chart(interval: ${ opts.interval }, limit: 7) {
					id
					count
				}
			}
		}
	`

	const variables = {
		eventId,
		interval: opts.interval
	}

	const selector = (data, entryName = 'event') => data[entryName].statistics.chart

	return {
		id,
		Renderer: EventEntriesChartRenderer,
		query,
		variables,
		selector,
		enhancer: (chartEntries) => enhanceEventChartEntries(chartEntries, 7)
	}

}
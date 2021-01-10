import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceEventChartEntries from '../enhancers/enhanceEventChartEntries'
import formatFloat from '../utils/formatFloat'
import createWidgetId from '../utils/createWidgetId'

const EventEntriesChartRenderer = (props) => h(RendererChart, {
	...props,
	formatter: formatFloat
})

export default (eventId, opts) => {

	const id = createWidgetId('fetchEventsChart', eventId, opts)

	const query = `
		event(id: "${ eventId }") {
			statistics {
				chart(interval: ${ opts.interval }, type: ${ opts.type }, limit: 7) {
					id
					count
				}
			}
		}
	`

	const variables = {
		eventId,
		interval: opts.interval,
		type: opts.type
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
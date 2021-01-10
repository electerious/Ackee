import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceDurations from '../enhancers/enhanceDurations'
import formatDuration from '../utils/formatDuration'
import createWidgetId from '../utils/createWidgetId'

export const DurationsChartRenderer = (props) => h(RendererChart, {
	...props,
	formatter: (ms) => formatDuration(ms).toString()
})

export default (domainId, opts) => {

	const id = createWidgetId('fetchDurations', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				durations(interval: ${ opts.interval }, limit: ${ opts.limit }) {
					id
					count
				}
			}
		}
	`

	const variables = {
		domainId,
		interval: opts.interval,
		limit: opts.limit
	}

	const selector = (data, entryName = 'domain') => data[entryName].statistics.durations

	return {
		id,
		Renderer: DurationsChartRenderer,
		query,
		variables,
		selector,
		enhancer: (durations) => enhanceDurations(durations, opts.limit)
	}

}
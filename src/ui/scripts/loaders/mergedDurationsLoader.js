import { createElement as h } from 'react'

import { DurationsChartRenderer } from './durationsLoader'
import enhanceDurations from '../enhancers/enhanceDurations'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedDurations', undefined, opts)

	const query = `
		statistics {
			durations(interval: ${ opts.interval }, limit: ${ opts.limit }) {
				id
				count
			}
		}
	`

	const variables = {
		interval: opts.interval,
		limit: opts.limit
	}

	const selector = (data, entryName = 'statistics') => data[entryName].durations

	return {
		id,
		Renderer: DurationsChartRenderer,
		query,
		variables,
		selector,
		enhancer: (durations) => enhanceDurations(durations, opts.limit)
	}

}
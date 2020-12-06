import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceDurations from '../enhancers/enhanceDurations'
import formatDuration from '../utils/formatDuration'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedDurations', undefined, opts)

	const query = `
		statistics {
			durations(interval: ${ opts.interval }) {
				id
				count
			}
		}
	`

	const variables = {
		interval: opts.interval
	}

	const selector = (data, entryName = 'statistics') => data[entryName].durations

	return {
		id,
		Renderer: (props) => h(RendererChart, {
			...props,
			formatter: (ms) => formatDuration(ms).toString()
		}),
		query,
		variables,
		selector,
		enhancer: (durations) => enhanceDurations(durations, 14)
	}

}
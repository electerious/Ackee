import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceDurations from '../enhancers/enhanceDurations'
import formatDuration from '../utils/formatDuration'

export default (opts) => {

	// TODO: Improve ids
	const id = `fetchMergedDurations${ JSON.stringify(opts) }`

	const query = `
		query fetchDurations($interval: Interval!) {
			statistics {
				durations(interval: $interval) {
					id
					count
				}
			}
		}
	`

	const variables = {
		interval: opts.interval
	}

	const selector = (data) => data.statistics.durations

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
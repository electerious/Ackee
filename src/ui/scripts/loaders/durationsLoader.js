import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceDurations from '../enhancers/enhanceDurations'
import formatDuration from '../utils/formatDuration'

export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchDurations${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchDurations($domainId: ID!, $interval: Interval!) {
			domain(id: $domainId) {
				id
				statistics {
					durations(interval: $interval) {
						id
						count
					}
				}
			}
		}
	`

	const variables = {
		domainId,
		interval: opts.interval
	}

	const selector = (data) => data.domain.statistics.durations

	return {
		id,
		Renderer: (props) => h(RendererChart, {
			...props,
			formatter: (ms) => formatDuration(ms).toString()
		}),
		query,
		variables,
		selector,
		enhancer: (durations) => enhanceDurations(durations, 7)
	}

}
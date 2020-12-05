import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceViews from '../enhancers/enhanceViews'
import formatNumber from '../utils/formatNumber'

export default (opts) => {

	// TODO: Improve ids
	const id = `fetchMergedViews${ JSON.stringify(opts) }`

	const query = `
		query fetchViews($interval: Interval!, $type: ViewType!) {
			statistics {
				views(interval: $interval, type: $type) {
					id
					count
				}
			}
		}
	`

	const variables = {
		interval: opts.interval,
		type: opts.type
	}

	const selector = (data) => data.statistics.views

	return {
		id,
		Renderer: (props) => h(RendererChart, {
			...props,
			formatter: formatNumber
		}),
		query,
		variables,
		selector,
		enhancer: (views) => enhanceViews(views, 14)
	}

}
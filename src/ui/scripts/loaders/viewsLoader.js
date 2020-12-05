import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceViews from '../enhancers/enhanceViews'
import formatNumber from '../utils/formatNumber'

export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchViews${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchViews($domainId: ID!, $interval: Interval!, $type: ViewType!) {
			domain(id: $domainId) {
				statistics {
					views(interval: $interval, type: $type) {
						id
						count
					}
				}
			}
		}
	`

	const variables = {
		domainId,
		interval: opts.interval,
		type: opts.type
	}

	const selector = (data) => data.domain.statistics.views

	return {
		id,
		Renderer: (props) => h(RendererChart, {
			...props,
			formatter: formatNumber
		}),
		query,
		variables,
		selector,
		enhancer: (views) => enhanceViews(views, 7)
	}

}
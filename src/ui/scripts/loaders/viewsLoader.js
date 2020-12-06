import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceViews from '../enhancers/enhanceViews'
import formatNumber from '../utils/formatNumber'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchViews', domainId, opts)

	const query = `
		query fetchViews($domainId: ID!, $interval: Interval!, $type: ViewType!) {
			domain(id: $domainId) {
				statistics {
					views(interval: $interval, type: $type, limit: 7) {
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
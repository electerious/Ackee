import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceViews from '../enhancers/enhanceViews'
import formatNumber from '../utils/formatNumber'
import createWidgetId from '../utils/createWidgetId'

export const ViewsChartRenderer = (props) => h(RendererChart, {
	...props,
	formatter: formatNumber
})

export default (domainId, opts) => {

	const id = createWidgetId('fetchViews', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				views(interval: ${ opts.interval }, type: ${ opts.type }, limit: ${ opts.limit }) {
					id
					count
				}
			}
		}
	`

	const variables = {
		domainId,
		interval: opts.interval,
		type: opts.type,
		limit: opts.limit
	}

	const selector = (data, entryName = 'domain') => data[entryName].statistics.views

	return {
		id,
		Renderer: ViewsChartRenderer,
		query,
		variables,
		selector,
		enhancer: (views) => enhanceViews(views, opts.limit)
	}

}
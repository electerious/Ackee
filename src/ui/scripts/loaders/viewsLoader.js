import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceViews from '../enhancers/enhanceViews'
import formatNumber from '../utils/formatNumber'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchViews', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				views(interval: ${ opts.interval }, type: ${ opts.type }, limit: 7) {
					id
					count
				}
			}
		}
	`

	const variables = {
		domainId,
		type: opts.type,
		interval: opts.interval
	}

	const selector = (data, entryName = 'domain') => data[entryName].statistics.views

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
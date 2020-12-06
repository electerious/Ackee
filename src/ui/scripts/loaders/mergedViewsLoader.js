import { createElement as h } from 'react'

import RendererChart from '../components/renderers/RendererChart'
import enhanceViews from '../enhancers/enhanceViews'
import formatNumber from '../utils/formatNumber'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedViews', undefined, opts)

	const query = `
		statistics {
			views(interval: ${ opts.interval }, type: ${ opts.type }) {
				id
				count
			}
		}
	`

	const variables = {
		interval: opts.interval,
		type: opts.type
	}

	const selector = (data, entryName = 'statistics') => data[entryName].views

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
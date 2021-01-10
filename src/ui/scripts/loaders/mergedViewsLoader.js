import { createElement as h } from 'react'

import { ViewsChartRenderer } from './viewsLoader'
import enhanceViews from '../enhancers/enhanceViews'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedViews', undefined, opts)

	const query = `
		statistics {
			views(interval: ${ opts.interval }, type: ${ opts.type }, limit: ${ opts.limit }) {
				id
				count
			}
		}
	`

	const variables = {
		type: opts.type,
		interval: opts.interval,
		limit: opts.limit
	}

	const selector = (data, entryName = 'statistics') => data[entryName].views

	return {
		id,
		Renderer: ViewsChartRenderer,
		query,
		variables,
		selector,
		enhancer: (views) => enhanceViews(views, opts.limit)
	}

}
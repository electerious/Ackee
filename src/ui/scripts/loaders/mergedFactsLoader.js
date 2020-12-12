import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceFacts from '../enhancers/enhanceFacts'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchFacts', undefined, opts)

	const query = `
		facts {
			activeVisitors
			averageViews
			averageDuration
			viewsToday
			viewsMonth
			viewsYear
		}
	`

	const variables = {}

	const selector = (data, entryName = 'facts') => data[entryName]

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceFacts
	}

}
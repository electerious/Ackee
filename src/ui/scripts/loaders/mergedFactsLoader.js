import { createElement as h } from 'react'

import enhanceFacts from '../enhancers/enhanceFacts'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedFacts', undefined, opts)

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
		Renderer: undefined,
		query,
		variables,
		selector,
		enhancer: enhanceFacts
	}

}
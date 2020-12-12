import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceFacts from '../enhancers/enhanceFacts'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchLanguages', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			facts {
				activeVisitors
				averageViews
				averageDuration
				viewsToday
				viewsMonth
				viewsYear
			}
		}
	`

	const variables = {
		domainId
	}

	const selector = (data, entryName = 'domain') => data[entryName].facts

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceFacts
	}

}
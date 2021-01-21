import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceLanguages from '../enhancers/enhanceLanguages'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchFacts', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				languages(sorting: ${ opts.sorting }, range: ${ opts.range }) {
					id
					count
					created
				}
			}
		}
	`

	const variables = {
		domainId,
		sorting: opts.sorting,
		range: opts.range
	}

	const selector = (data, entryName = 'domain') => data[entryName].statistics.languages

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceLanguages
	}

}
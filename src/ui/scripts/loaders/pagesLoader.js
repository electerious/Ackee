import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhancePages from '../enhancers/enhancePages'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchPages', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				pages(sorting: ${ opts.sorting }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'domain') => data[entryName].statistics.pages

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhancePages
	}

}
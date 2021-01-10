import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceBrowsers from '../enhancers/enhanceBrowsers'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchBrowsers', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				browsers(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
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
		type: opts.type,
		range: opts.range
	}

	const selector = (data, entryName = 'domain') => data[entryName].statistics.browsers

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceBrowsers
	}

}
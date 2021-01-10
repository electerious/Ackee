import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceSizes from '../enhancers/enhanceSizes'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchSizes', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				sizes(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'domain') => data[entryName].statistics.sizes

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceSizes
	}

}
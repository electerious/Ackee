import { createElement as h } from 'react'

import RendererReferrers from '../components/renderers/RendererReferrers'
import enhanceReferrers from '../enhancers/enhanceReferrers'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchReferrers', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				referrers(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'domain') => data[entryName].statistics.referrers

	return {
		id,
		Renderer: RendererReferrers,
		query,
		variables,
		selector,
		enhancer: enhanceReferrers
	}

}
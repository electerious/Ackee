import { createElement as h } from 'react'

import RendererReferrers from '../components/renderers/RendererReferrers'
import enhanceReferrers from '../enhancers/enhanceReferrers'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchReferrers', domainId, opts)

	const query = `
		query fetchReferrers($domainId: ID!, $sorting: Sorting!, $range: Range) {
			domain(id: $domainId) {
				statistics {
					referrers(sorting: $sorting, range: $range) {
						id
						count
						created
					}
				}
			}
		}
	`

	const variables = {
		domainId,
		sorting: opts.sorting,
		range: opts.range
	}

	const selector = (data) => data.domain.statistics.referrers

	return {
		id,
		Renderer: RendererReferrers,
		query,
		variables,
		selector,
		enhancer: enhanceReferrers
	}

}
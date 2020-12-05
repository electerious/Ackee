import { createElement as h } from 'react'

import RendererReferrers from '../components/renderers/RendererReferrers'
import enhanceReferrers from '../enhancers/enhanceReferrers'

export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchReferrers${ domainId }${ JSON.stringify(opts) }`

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
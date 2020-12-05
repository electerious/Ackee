import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhancePages from '../enhancers/enhancePages'

export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchPages${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchPages($domainId: ID!, $sorting: Sorting!, $range: Range) {
			domain(id: $domainId) {
				statistics {
					pages(sorting: $sorting, range: $range) {
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

	const selector = (data) => data.domain.statistics.pages

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhancePages
	}

}
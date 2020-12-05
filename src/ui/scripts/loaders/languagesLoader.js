import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceLanguages from '../enhancers/enhanceLanguages'

export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchLanguages${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchLanguages($domainId: ID!, $sorting: Sorting!, $range: Range) {
			domain(id: $domainId) {
				statistics {
					languages(sorting: $sorting, range: $range) {
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

	const selector = (data) => data.domain.statistics.languages

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceLanguages
	}

}
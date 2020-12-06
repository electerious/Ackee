import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceLanguages from '../enhancers/enhanceLanguages'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchLanguages', domainId, opts)

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
import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhancePages from '../enhancers/enhancePages'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchPages', domainId, opts)

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
import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceSizes from '../enhancers/enhanceSizes'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchSizes', domainId, opts)

	const query = `
		query fetchSizes($domainId: ID!, $sorting: Sorting!, $type: SizeType!, $range: Range) {
			domain(id: $domainId) {
				statistics {
					sizes(sorting: $sorting, type: $type, range: $range) {
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
		range: opts.range,
		type: opts.type
	}

	const selector = (data) => data.domain.statistics.sizes

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceSizes
	}

}
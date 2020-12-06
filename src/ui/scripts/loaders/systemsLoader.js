import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceSystems from '../enhancers/enhanceSystems'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchSystems', domainId, opts)

	const query = `
		query fetchSystems($domainId: ID!, $sorting: Sorting!, $type: SystemType!, $range: Range) {
			domain(id: $domainId) {
				statistics {
					systems(sorting: $sorting, type: $type, range: $range) {
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

	const selector = (data) => data.domain.statistics.systems

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceSystems
	}

}
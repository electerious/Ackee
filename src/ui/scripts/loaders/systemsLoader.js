import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceSystems from '../enhancers/enhanceSystems'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchSystems', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				systems(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'domain') => data[entryName].statistics.systems

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceSystems
	}

}
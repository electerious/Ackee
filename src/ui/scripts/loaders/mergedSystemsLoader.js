import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceSystems from '../enhancers/enhanceSystems'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedSystems', undefined, opts)

	const query = `
		statistics {
			systems(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
				id
				count
				created
			}
		}
	`

	const variables = {
		sorting: opts.sorting,
		type: opts.type,
		range: opts.range
	}

	const selector = (data, entryName = 'statistics') => data[entryName].systems

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceSystems
	}

}
import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceSizes from '../enhancers/enhanceSizes'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedSizes', undefined, opts)

	const query = `
		statistics {
			sizes(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'statistics') => data[entryName].sizes

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceSizes
	}

}
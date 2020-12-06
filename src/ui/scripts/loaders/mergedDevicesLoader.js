import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceDevices from '../enhancers/enhanceDevices'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedDevices', undefined, opts)

	const query = `
		statistics {
			devices(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'statistics') => data[entryName].devices

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceDevices
	}

}
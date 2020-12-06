import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceBrowsers from '../enhancers/enhanceBrowsers'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedBrowsers', undefined, opts)

	const query = `
		statistics {
			browsers(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'statistics') => data[entryName].browsers

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceBrowsers
	}

}
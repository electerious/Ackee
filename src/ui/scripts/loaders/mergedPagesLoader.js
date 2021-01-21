import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhancePages from '../enhancers/enhancePages'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedPages', undefined, opts)

	const query = `
		statistics {
			pages(sorting: ${ opts.sorting }, range: ${ opts.range }) {
				id
				count
				created
			}
		}
	`

	const variables = {
		sorting: opts.sorting,
		range: opts.range
	}

	const selector = (data, entryName = 'statistics') => data[entryName].pages

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhancePages
	}

}
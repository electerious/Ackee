import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceLanguages from '../enhancers/enhanceLanguages'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedLanguages', undefined, opts)

	const query = `
		statistics {
			languages(sorting: ${ opts.sorting }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'statistics') => data[entryName].languages

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceLanguages
	}

}
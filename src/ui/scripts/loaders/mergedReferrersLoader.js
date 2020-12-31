import { createElement as h } from 'react'

import RendererReferrers from '../components/renderers/RendererReferrers'
import enhanceReferrers from '../enhancers/enhanceReferrers'
import createWidgetId from '../utils/createWidgetId'

export default (opts) => {

	const id = createWidgetId('fetchMergedReferrers', undefined, opts)

	const query = `
		statistics {
			referrers(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'statistics') => data[entryName].referrers

	return {
		id,
		Renderer: RendererReferrers,
		query,
		variables,
		selector,
		enhancer: enhanceReferrers
	}

}
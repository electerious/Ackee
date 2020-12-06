import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceBrowsers from '../enhancers/enhanceBrowsers'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchBrowsers', domainId, opts)

	const query = `
		query fetchBrowsers($domainId: ID!, $sorting: Sorting!, $type: BrowserType!, $range: Range) {
			domain(id: $domainId) {
				statistics {
					browsers(sorting: $sorting, type: $type, range: $range) {
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

	const selector = (data) => data.domain.statistics.browsers

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceBrowsers
	}

}
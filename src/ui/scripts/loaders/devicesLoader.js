import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceDevices from '../enhancers/enhanceDevices'
import createWidgetId from '../utils/createWidgetId'

export default (domainId, opts) => {

	const id = createWidgetId('fetchDevices', domainId, opts)

	const query = `
		domain(id: "${ domainId }") {
			statistics {
				devices(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
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

	const selector = (data, entryName = 'domain') => data[entryName].statistics.devices

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceDevices
	}

}
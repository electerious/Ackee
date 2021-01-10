import { createElement as h } from 'react'

import RendererList from '../components/renderers/RendererList'
import enhanceEventListEntries from '../enhancers/enhanceEventListEntries'
import createWidgetId from '../utils/createWidgetId'

export default (eventId, opts) => {

	const id = createWidgetId('fetchEventList', eventId, opts)

	const query = `
		event(id: "${ eventId }") {
			statistics {
				list(sorting: ${ opts.sorting }, type: ${ opts.type }, range: ${ opts.range }) {
					id
					count
					created
				}
			}
		}
	`

	const variables = {
		eventId,
		sorting: opts.sorting,
		type: opts.type,
		range: opts.range
	}

	const selector = (data, entryName = 'event') => data[entryName].statistics.list

	return {
		id,
		Renderer: RendererList,
		query,
		variables,
		selector,
		enhancer: enhanceEventListEntries
	}

}
import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import CardList from '../components/cards/CardList'
import enhanceBrowsers from '../enhancers/enhanceBrowsers'

const Renderer = (props) => {
	return h(CardList, {
		headline: props.headline,
		range: props.widget.variables.range,
		sorting: props.widget.variables.sorting,
		stale: props.stale,
		items: enhanceBrowsers(props.widget.value),
		onMore: props.onMore
	})
}

Renderer.propTypes = {
	headline: PropTypes.string.isRequired,
	widget: PropTypes.object.isRequired,
	stale: PropTypes.bool.isRequired,
	onMore: PropTypes.func
}

export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchBrowsers${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchBrowsers($domainId: ID!, $sorting: Sorting!, $type: BrowserType!, $range: Range) {
			domain(id: $domainId) {
				id
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
		Renderer,
		query,
		variables,
		selector
	}

}
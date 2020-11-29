import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import CardPages from '../components/cards/CardPages'
import enhancePages from '../enhancers/enhancePages'

const Renderer = (props) => {
	return h(CardPages, {
		headline: props.headline,
		range: props.widget.variables.range,
		sorting: props.widget.variables.sorting,
		stale: props.stale,
		items: enhancePages(props.widget.value),
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
	const id = `fetchPages${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchPages($domainId: ID!, $sorting: Sorting!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					pages(sorting: $sorting, range: $range) {
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
		range: opts.range
	}

	const selector = (data) => data.domain.statistics.pages

	return {
		id,
		Renderer,
		query,
		variables,
		selector
	}

}
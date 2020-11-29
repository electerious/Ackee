import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import CardList from '../components/cards/CardList'
import enhanceSizes from '../enhancers/enhanceSizes'

const Renderer = (props) => {
	return h(CardList, {
		headline: props.headline,
		range: props.widget.variables.range,
		sorting: props.widget.variables.sorting,
		stale: props.stale,
		items: enhanceSizes(props.widget.value),
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
	const id = `fetchSizes${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchSizes($domainId: ID!, $sorting: Sorting!, $type: SizeType!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					sizes(sorting: $sorting, type: $type, range: $range) {
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

	const selector = (data) => data.domain.statistics.sizes

	return {
		id,
		Renderer,
		query,
		variables,
		selector
	}

}
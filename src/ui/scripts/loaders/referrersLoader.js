import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import CardReferrers from '../components/cards/CardReferrers'
import enhanceReferrers from '../enhancers/enhanceReferrers'

const Renderer = (props) => {
	return h(CardReferrers, {
		headline: props.headline,
		range: props.widget.variables.range,
		sorting: props.widget.variables.sorting,
		stale: props.stale,
		items: enhanceReferrers(props.widget.value),
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
	const id = `fetchReferrers${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchReferrers($domainId: ID!, $sorting: Sorting!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					referrers(sorting: $sorting, range: $range) {
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

	const selector = (data) => data.domain.statistics.referrers

	return {
		id,
		Renderer,
		query,
		variables,
		selector
	}

}
import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import CardList from '../components/cards/CardList'
import enhanceLanguages from '../enhancers/enhanceLanguages'

const Renderer = (props) => {
	return h(CardList, {
		headline: props.headline,
		range: props.widget.variables.range,
		sorting: props.widget.variables.sorting,
		stale: props.stale,
		items: enhanceLanguages(props.widget.value),
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
	const id = `fetchLanguages${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchLanguages($domainId: ID!, $sorting: Sorting!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					languages(sorting: $sorting, range: $range) {
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

	const selector = (data) => data.domain.statistics.languages

	return {
		id,
		Renderer,
		query,
		variables,
		selector
	}

}
import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import CardViews from '../components/cards/CardViews'
import enhanceViews from '../enhancers/enhanceViews'

const Renderer = (props) => {
	return h(CardViews, {
		headline: props.headline,
		interval: props.widget.variables.interval,
		sorting: props.widget.variables.sorting,
		stale: props.stale,
		items: enhanceViews(props.widget.value, 7),
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
	const id = `fetchViews${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchViews($domainId: ID!, $interval: Interval!, $type: ViewType!) {
			domain(id: $domainId) {
				id
				statistics {
					views(interval: $interval, type: $type) {
						id
						count
					}
				}
			}
		}
	`

	const variables = {
		domainId,
		interval: opts.interval,
		type: opts.type
	}

	const selector = (data) => data.domain.statistics.views

	return {
		id,
		Renderer,
		query,
		variables,
		selector
	}

}
import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import CardChart from '../components/cards/CardChart'
import enhanceDurations from '../enhancers/enhanceDurations'
import formatDuration from '../utils/formatDuration'

const Renderer = (props) => {
	return h(CardChart, {
		headline: props.headline,
		interval: props.widget.variables.interval,
		sorting: props.widget.variables.sorting,
		stale: props.stale,
		items: enhanceDurations(props.widget.value, 7),
		formatter: (ms) => formatDuration(ms).toString(),
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
	const id = `fetchDurations${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchDurations($domainId: ID!, $interval: Interval!) {
			domain(id: $domainId) {
				id
				statistics {
					durations(interval: $interval) {
						id
						count
					}
				}
			}
		}
	`

	const variables = {
		domainId,
		interval: opts.interval
	}

	const selector = (data) => data.domain.statistics.durations

	return {
		id,
		Renderer,
		query,
		variables,
		selector
	}

}
import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Headline from '../Headline'
import Text from '../Text'
import Updating from '../Updating'
import PresentationValuesBar from '../presentations/PresentationValuesBar'
import PresentationEmptyState, { ICON_LOADING, ICON_WARNING } from '../presentations/PresentationEmptyState'
import rangeLabel from '../../utils/rangeLabel'
import status from '../../utils/status'

const textLabel = (range, isStale) => {

	if (isStale === true) return h(Updating)

	return rangeLabel(range)

}

const CardDetailedDurations = (props) => {

	const {
		isEmpty,
		isStale,
		isLoading
	} = status(props.items, props.loading)

	const presentation = (() => {

		if (isLoading === true) return h(PresentationEmptyState, {
			icon: ICON_LOADING
		}, 'Loading durations')

		if (isEmpty === false) return h(PresentationValuesBar, {
			items: props.items
		})

		return h(PresentationEmptyState, {
			icon: ICON_WARNING
		}, 'No durations')

	})()

	return (
		h('div', {
			className: 'card'
		},
			h('div', { className: 'card__inner' },
				h(Headline, {
					type: 'h2',
					small: true,
					className: 'color-white'
				}, props.headline),
				h(Text, {
					type: 'div',
					spacing: false
				}, textLabel(
					props.range,
					isStale
				)),
				presentation
			)
		)
	)

}

CardDetailedDurations.propTypes = {
	headline: PropTypes.string.isRequired,
	range: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired
}

export default CardDetailedDurations
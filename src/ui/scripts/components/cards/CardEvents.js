import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Headline from '../Headline'
import Text from '../Text'
import PresentationCounterList from '../presentations/PresentationCounterList'
import PresentationEmptyState, { ICON_LOADING, ICON_WARNING } from '../presentations/PresentationEmptyState'
import relativeDate from '../../utils/relativeDate'
import rangeLabel from '../../utils/rangeLabel'

const textLabel = (item, range, isRecent) => {

	if (item && item.date) return relativeDate(item.date)
	if (isRecent) return 'Recent'

	return rangeLabel(range)

}

const CardEvents = (props) => {

	const presentation = (() => {

		if (props.loading === true) return h(PresentationEmptyState, {
			icon: ICON_LOADING
		}, 'Loading events')

		const hasItems = props.items.length > 0

		if (hasItems) return h(PresentationCounterList, {
			items: props.items
		})

		return h(PresentationEmptyState, {
			icon: ICON_WARNING
		}, 'No events')

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
					spacing: false
				}, textLabel(null, props.range)),
				presentation
			)
		)
	)

}

CardEvents.propTypes = {
	headline: PropTypes.string.isRequired,
	range: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired
}

export default CardEvents
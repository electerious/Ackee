import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import { SORTINGS_TOP, SORTINGS_RECENT } from '../../../../constants/sortings'

import Headline from '../Headline'
import Text from '../Text'
import Updating from '../Updating'
import PresentationCounterList from '../presentations/PresentationCounterList'
import PresentationList from '../presentations/PresentationList'
import relativeDate from '../../utils/relativeDate'
import rangeLabel from '../../utils/rangeLabel'

const textLabel = (item, range, isRecent, isStale) => {

	if (isStale === true) return h(Updating)
	if (item && item.date) return relativeDate(item.date)
	if (isRecent) return 'Recent'

	return rangeLabel(range)

}

const CardSystems = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState()

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive()

	const presentation = (() => {

		if (props.sorting === SORTINGS_TOP) return h(PresentationCounterList, {
			items: props.items
		})

		return h(PresentationList, {
			items: props.items,
			onEnter,
			onLeave
		})

	})()

	return (
		h('div', {
			className: 'card'
		},
			h('div', { className: 'card__inner' },
				h(Headline, {
					type: 'h2',
					size: 'medium',
					onClick: props.onMore
				}, props.headline),
				h(Text, {
					type: 'div',
					spacing: false
				}, textLabel(
					props.items[active],
					props.range,
					props.sorting === SORTINGS_RECENT,
					props.stale
				)),
				presentation
			)
		)
	)

}

CardSystems.propTypes = {
	headline: PropTypes.string.isRequired,
	range: PropTypes.string.isRequired,
	sorting: PropTypes.string.isRequired,
	stale: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
	onMore: PropTypes.func
}

export default CardSystems
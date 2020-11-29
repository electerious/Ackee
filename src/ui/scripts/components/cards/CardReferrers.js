import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import { SORTINGS_NEW, SORTINGS_RECENT } from '../../../../constants/sortings'

import Headline from '../Headline'
import Text from '../Text'
import Updating from '../Updating'
import PresentationIconList from '../presentations/PresentationIconList'
import relativeDate from '../../utils/relativeDate'
import rangeLabel from '../../utils/rangeLabel'

const textLabel = (item, range, isRecent, isNew, isStale) => {

	if (isStale === true) return h(Updating)

	if (item && item.date) return relativeDate(item.date)
	if (item && item.count) return `${ item.count } ${ item.count === 1 ? 'visit' : 'visits' }`

	if (isRecent) return 'Recent'
	if (isNew) return 'New'

	return rangeLabel(range)

}

const CardReferrers = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState()

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive()

	const presentation = (() => {

		return h(PresentationIconList, {
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
					props.sorting === SORTINGS_NEW,
					props.stale
				)),
				presentation
			)
		)
	)

}

CardReferrers.propTypes = {
	headline: PropTypes.string.isRequired,
	range: PropTypes.string.isRequired,
	stale: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
	onMore: PropTypes.func
}

export default CardReferrers
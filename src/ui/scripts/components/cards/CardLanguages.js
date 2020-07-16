import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import { SORTINGS_TOP, SORTINGS_RECENT } from '../../../../constants/sortings'

import Headline from '../Headline'
import Text from '../Text'
import Updating from '../Updating'
import PresentationCounterList from '../presentations/PresentationCounterList'
import PresentationList from '../presentations/PresentationList'
import PresentationEmptyState, { ICON_LOADING, ICON_WARNING } from '../presentations/PresentationEmptyState'
import relativeDate from '../../utils/relativeDate'
import rangeLabel from '../../utils/rangeLabel'
import status from '../../utils/status'

const textLabel = (item, range, isRecent, isStale) => {

	if (isStale === true) return h(Updating)
	if (item && item.date) return relativeDate(item.date)
	if (isRecent) return 'Recent'

	return rangeLabel(range)

}

const CardLanguages = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState()

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive()

	const {
		isEmpty,
		isStale,
		isLoading
	} = status(props.items, props.loading)

	const presentation = (() => {

		if (isLoading === true) return h(PresentationEmptyState, {
			icon: ICON_LOADING
		}, 'Loading languages')

		if (isEmpty === false && props.sorting === SORTINGS_TOP) return h(PresentationCounterList, {
			items: props.items
		})

		if (isEmpty === false && props.sorting === SORTINGS_RECENT) return h(PresentationList, {
			items: props.items,
			onEnter,
			onLeave
		})

		return h(PresentationEmptyState, {
			icon: ICON_WARNING
		}, 'No languages')

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
					isStale
				)),
				presentation
			)
		)
	)

}

CardLanguages.propTypes = {
	headline: PropTypes.string.isRequired,
	range: PropTypes.string.isRequired,
	sorting: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
	onMore: PropTypes.func
}

export default CardLanguages
import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import { PAGES_SORTING_TOP,	PAGES_SORTING_RECENT } from '../../../../constants/pages'

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

const CardPages = (props) => {

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
		}, 'Loading pages')

		if (isEmpty === false && props.sorting === PAGES_SORTING_TOP) return h(PresentationCounterList, {
			items: props.items
		})

		if (isEmpty === false && props.sorting === PAGES_SORTING_RECENT) return h(PresentationList, {
			items: props.items,
			onEnter,
			onLeave
		})

		return h(PresentationEmptyState, {
			icon: ICON_WARNING
		}, 'No pages')

	})()

	return (
		h('div', {
			className: 'card'
		},
			h('div', { className: 'card__inner' },
				h(Headline, {
					type: 'h2',
					small: true,
					className: 'color-white',
					onClick: props.onMore
				}, props.headline),
				h(Text, {
					type: 'div',
					spacing: false
				}, textLabel(
					props.items[active],
					props.range,
					props.sorting === PAGES_SORTING_RECENT,
					isStale
				)),
				presentation
			)
		)
	)

}

CardPages.propTypes = {
	headline: PropTypes.string.isRequired,
	range: PropTypes.string.isRequired,
	sorting: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
	onMore: PropTypes.func
}

export default CardPages
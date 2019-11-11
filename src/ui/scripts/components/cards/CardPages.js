import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import {
	PAGES_SORTING_TOP,
	PAGES_SORTING_RECENT
} from '../../../../constants/pages'

import Headline from '../Headline'
import Text from '../Text'
import PresentationCounterList from '../presentations/PresentationCounterList'
import PresentationList from '../presentations/PresentationList'
import PresentationEmptyState, { ICON_LOADING, ICON_WARNING } from '../presentations/PresentationEmptyState'
import relativeDate from '../../utils/relativeDate'

const textLabel = (item) => {

	const defaultLabel = 'Last 7 days'

	if (item == null) return defaultLabel
	if (item.date != null) return relativeDate(item.date)

	return defaultLabel

}

const CardPages = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState()

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive()

	const presentation = (() => {

		if (props.loading === true) return h(PresentationEmptyState, {
			icon: ICON_LOADING
		}, 'Loading pages')

		const hasItems = props.items.length > 0

		if (hasItems === true && props.sorting === PAGES_SORTING_TOP) return h(PresentationCounterList, {
			items: props.items
		})

		if (hasItems === true && props.sorting === PAGES_SORTING_RECENT) return h(PresentationList, {
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
					className: 'color-white'
				}, props.headline),
				h(Text, {
					spacing: false
				}, textLabel(props.items[active])),
				presentation
			)
		)
	)

}

CardPages.propTypes = {
	headline: PropTypes.string.isRequired,
	sorting: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired
}

export default CardPages
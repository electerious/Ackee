import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import { BROWSERS_SORTING_TOP, BROWSERS_SORTING_RECENT } from '../../../../constants/browsers'
import { ALL_TIME, LAST_7_DAYS, LAST_30_DAYS } from '../../../../constants/dateRange'

import Headline from '../Headline'
import Text from '../Text'
import PresentationCounterList from '../presentations/PresentationCounterList'
import PresentationList from '../presentations/PresentationList'
import PresentationEmptyState, { ICON_LOADING, ICON_WARNING } from '../presentations/PresentationEmptyState'
import relativeDate from '../../utils/relativeDate'

const textLabel = (item, dateRange) => {
	if (item && item.date) return relativeDate(item.date)
	if (dateRange) {
		const range = [ ALL_TIME, LAST_7_DAYS, LAST_30_DAYS ].find((range) => range.value === Number(dateRange))
		if (range) return range.label
	}

	return LAST_7_DAYS.label
}

const CardBrowsers = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState()

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive()

	const presentation = (() => {

		if (props.loading === true) return h(PresentationEmptyState, {
			icon: ICON_LOADING
		}, 'Loading browsers')

		const hasItems = props.items.length > 0

		if (hasItems === true && props.sorting === BROWSERS_SORTING_TOP) return h(PresentationCounterList, {
			items: props.items
		})

		if (hasItems === true && props.sorting === BROWSERS_SORTING_RECENT) return h(PresentationList, {
			items: props.items,
			onEnter,
			onLeave
		})

		return h(PresentationEmptyState, {
			icon: ICON_WARNING
		}, 'No browser')

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
				}, textLabel(props.items[active], props.dateRange)),
				presentation
			)
		)
	)

}

CardBrowsers.propTypes = {
	headline: PropTypes.string.isRequired,
	dateRange: PropTypes.string.isRequired,
	sorting: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired
}

export default CardBrowsers
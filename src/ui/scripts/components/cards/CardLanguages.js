import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

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

const CardLanguages = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState(undefined)

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive(undefined)

	const presentation = (() => {

		if (props.loading === true) return h(PresentationEmptyState, {
			icon: ICON_LOADING
		}, 'Loading languages')

		const hasItems = props.items.length > 0
		const hasCount = props.items.every((item) => item.count != null)

		if (hasItems === true && hasCount === true) return h(PresentationCounterList, {
			items: props.items
		})

		if (hasItems === true && hasCount === false) return h(PresentationList, {
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

CardLanguages.propTypes = {
	headline: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired
}

export default CardLanguages
import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import Headline from '../Headline'
import Text from '../Text'
import PresentationIconList from '../presentations/PresentationIconList'
import PresentationEmptyState, { ICON_LOADING, ICON_WARNING } from '../presentations/PresentationEmptyState'
import relativeDate from '../../utils/relativeDate'

const textLabel = (item) => {

	const defaultLabel = 'Last 7 days'

	if (item == null) return defaultLabel
	if (item.date != null) return relativeDate(item.date)
	if (item.count != null) return `${ item.count } ${ item.count === 1 ? 'visit' : 'visits' }`

	return defaultLabel

}

const CardReferrers = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState(undefined)

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive(undefined)

	const presentation = (() => {

		if (props.loading === true) return h(PresentationEmptyState, {
			icon: ICON_LOADING
		}, 'Loading referrers')

		const hasItems = props.items.length > 0

		if (hasItems === true) return h(PresentationIconList, {
			items: props.items,
			onEnter,
			onLeave
		})

		return h(PresentationEmptyState, {
			icon: ICON_WARNING
		}, 'No referrers')

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

CardReferrers.propTypes = {
	headline: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired
}

export default CardReferrers
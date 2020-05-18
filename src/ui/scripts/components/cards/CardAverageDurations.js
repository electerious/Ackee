import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from '../Headline'
import Text from '../Text'
import Updating from '../Updating'
import PresentationBarChart from '../presentations/PresentationBarChart'
import relativeDays from '../../utils/relativeDays'
import formatDuration from '../../utils/formatDuration'
import status from '../../utils/status'

const textLabel = (active, isStale) => {

	if (isStale === true) return h(Updating)

	return relativeDays(active)

}

const CardViews = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState(0)

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive(0)

	const formatter = (ms) => formatDuration(ms).toString()

	const {
		isStale
	} = status(props.items, props.loading)

	return (
		h('div', {
			className: classNames({
				'card': true,
				'card--wide': props.wide === true
			})
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
					active,
					isStale
				)),
				h(PresentationBarChart, {
					items: props.items,
					formatter,
					active: active,
					onEnter,
					onLeave
				})
			)
		)
	)

}

CardViews.propTypes = {
	wide: PropTypes.bool,
	headline: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
	onMore: PropTypes.func
}

export default CardViews
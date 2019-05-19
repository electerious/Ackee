import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import relativeDate from '../../utils/relativeDate'

import Headline from '../Headline'
import Text from '../Text'
import PresentationBarChart from '../presentations/PresentationBarChart'

const CardViews = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState(0)

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive(0)

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
					className: 'color-white'
				}, props.headline),
				h(Text, {
					spacing: false
				}, relativeDate(active)),
				h(PresentationBarChart, {
					items: props.items,
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
	items: PropTypes.array.isRequired
}

export default CardViews
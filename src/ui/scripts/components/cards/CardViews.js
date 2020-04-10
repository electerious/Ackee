import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { VIEWS_INTERVAL_DAILY, VIEWS_INTERVAL_MONTHLY, VIEWS_INTERVAL_YEARLY } from '../../../../constants/views'

import relativeDays from '../../utils/relativeDays'
import relativeMonths from '../../utils/relativeMonths'
import relativeYears from '../../utils/relativeYears'

import Headline from '../Headline'
import Text from '../Text'
import PresentationBarChart from '../presentations/PresentationBarChart'

const relativeFn = (interval) => {
	switch (interval) {
		case VIEWS_INTERVAL_DAILY: return relativeDays
		case VIEWS_INTERVAL_MONTHLY: return relativeMonths
		case VIEWS_INTERVAL_YEARLY: return relativeYears
	}
}

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
				}, relativeFn(props.interval)(active)),
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
	interval: PropTypes.string.isRequired,
	items: PropTypes.array.isRequired
}

export default CardViews
import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { VIEWS_INTERVAL_DAILY, VIEWS_INTERVAL_MONTHLY, VIEWS_INTERVAL_YEARLY } from '../../../../constants/views'

import Headline from '../Headline'
import Text from '../Text'
import Updating from '../Updating'
import PresentationBarChart from '../presentations/PresentationBarChart'
import relativeDays from '../../utils/relativeDays'
import relativeMonths from '../../utils/relativeMonths'
import relativeYears from '../../utils/relativeYears'
import status from '../../utils/status'

const relativeFn = (interval) => {

	switch (interval) {
		case VIEWS_INTERVAL_DAILY: return relativeDays
		case VIEWS_INTERVAL_MONTHLY: return relativeMonths
		case VIEWS_INTERVAL_YEARLY: return relativeYears
	}

}

const textLabel = (active, interval, isStale) => {

	if (isStale === true) return h(Updating)

	return relativeFn(interval)(active)

}

const CardViews = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState(0)

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive(0)

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
					className: 'color-white'
				}, props.headline),
				h(Text, {
					spacing: false
				}, textLabel(
					active,
					props.interval,
					isStale
				)),
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
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired
}

export default CardViews
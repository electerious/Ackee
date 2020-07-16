import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../../../../constants/intervals'

import Headline from '../Headline'
import Text from '../Text'
import Updating from '../Updating'
import PresentationBarChart from '../presentations/PresentationBarChart'
import relativeDays from '../../utils/relativeDays'
import relativeMonths from '../../utils/relativeMonths'
import relativeYears from '../../utils/relativeYears'
import formatDuration from '../../utils/formatDuration'
import status from '../../utils/status'

const formatter = (ms) => formatDuration(ms).toString()

const relativeFn = (interval) => {

	switch (interval) {
		case INTERVALS_DAILY: return relativeDays
		case INTERVALS_MONTHLY: return relativeMonths
		case INTERVALS_YEARLY: return relativeYears
	}

}

const textLabel = (active, interval, isStale) => {

	if (isStale === true) return h(Updating)

	return relativeFn(interval)(active)

}

const CardDurations = (props) => {

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
					size: 'medium',
					onClick: props.onMore
				}, props.headline),
				h(Text, {
					type: 'div',
					spacing: false
				}, textLabel(
					active,
					props.interval,
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

CardDurations.propTypes = {
	wide: PropTypes.bool,
	headline: PropTypes.string.isRequired,
	interval: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	items: PropTypes.array.isRequired,
	onMore: PropTypes.func
}

export default CardDurations
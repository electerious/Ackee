import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

import {
	DURATIONS_INTERVAL,
	DURATIONS_LIMIT
} from '../../../../constants/durations'

import minByProp from '../../utils/minByProp'
import maxByProp from '../../utils/maxByProp'
import formatDuration from '../../utils/formatDuration'

const Value = (props) => {

	return (
		h('div', {
			className: 'valuesBar__value',
			style: { '--opacity': props.opacity },
			onMouseEnter: props.onEnter,
			onMouseLeave: props.onLeave
		})
	)

}

const Content = (props) => {

	const hasDecorator = props.decorator != null

	return (
		h('div', { className: 'valuesBar__content' },
			h('p', { className: `valuesBar__duration color-${ props.color }` },
				hasDecorator === true && h('span', { className: 'valuesBar__decorator' }, props.decorator),
				props.duration.value,
				h('span', { className: 'valuesBar__unit' }, props.duration.unit)
			),
			h('p', { className: 'valuesBar__description' }, props.description)
		)
	)

}

const PresentationValuesBar = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState()

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive()

	const averageDuration = props.items[0].average

	const belowLimitItems = props.items.filter(({ duration }) => duration < DURATIONS_LIMIT)
	const aboveLimitItems = props.items.filter(({ duration }) => duration >= DURATIONS_LIMIT)

	const minDuration = belowLimitItems.reduce(minByProp('duration'), Number.MAX_SAFE_INTEGER)
	const maxDuration = belowLimitItems.reduce(maxByProp('duration'), 0)

	const maxCount = props.items.reduce(maxByProp('count'), 0)
	const proportionalOpacity = ({ count }) => count / maxCount

	const content = (() => {

		const activeItem = props.items[active]

		if (activeItem == null) return h(Content, {
			color: 'white',
			duration: formatDuration(averageDuration),
			description: 'Average visit duration'
		})

		const isBelowInterval = activeItem.duration < DURATIONS_INTERVAL
		const isAboveLimit = activeItem.duration >= DURATIONS_LIMIT

		const decorator = (() => {

			if (isBelowInterval === true) return '<'
			if (isAboveLimit === true) return '>'

		})()

		const duration = (() => {

			if (isBelowInterval === true) return formatDuration(DURATIONS_INTERVAL)
			return formatDuration(activeItem.duration)

		})()

		return h(Content, {
			color: 'primary',
			decorator,
			duration,
			description: `${ activeItem.count } visits`
		})

	})()

	return (
		h('div', { className: 'valuesBar' },
			h('div', { className: 'valuesBar__row' },
				h('div', { className: 'valuesBar__bar' },
					belowLimitItems.map((item, index) => (
						h(Value, {
							key: String(item.duration) + index,
							opacity: proportionalOpacity(item),
							onEnter: () => onEnter(index),
							onLeave: () => onLeave(index),
							...item
						})
					))
				),
				h('div', { className: 'valuesBar__inner' },
					h('div', { className: 'valuesBar__line' },
						h('div', { className: 'valuesBar__anchor valuesBar__anchor--bottom' },
							formatDuration(minDuration).toString()
						)
					),
					content,
					h('div', { className: 'valuesBar__line' },
						h('div', { className: 'valuesBar__anchor valuesBar__anchor--top' },
							formatDuration(maxDuration).toString()
						)
					)
				)
			),
			h('div', { className: 'valuesBar__row' },
				h('div', { className: 'valuesBar__bar' },
					aboveLimitItems.map((item, index) => (
						h(Value, {
							key: String(item.duration) + index,
							opacity: proportionalOpacity(item),
							onEnter: () => onEnter(belowLimitItems.length + index),
							onLeave: () => onLeave(belowLimitItems.length + index),
							...item
						})
					))
				)
			)
		)
	)

}

PresentationValuesBar.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		duration: PropTypes.number.isRequired,
		count: PropTypes.number.isRequired
	})).isRequired
}

export default PresentationValuesBar
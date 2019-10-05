import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'

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

const PresentationValuesBar = (props) => {

	// Index of the active element
	const [ active, setActive ] = useState(undefined)

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive(undefined)

	const averageDuration = props.items[0].average

	const minDuration = props.items.reduce(minByProp('duration'), Number.MAX_SAFE_INTEGER)
	const maxDuration = props.items.reduce(maxByProp('duration'), 0)

	const maxCount = props.items.reduce(maxByProp('count'), 0)
	const proportionalOpacity = ({ count }) => (count / maxCount)

	const limit = 3600000

	const belowLimitItems = props.items.filter(({ duration }) => duration < limit)
	const aboveLimitItems = props.items.filter(({ duration }) => duration >= limit)

	const content = (() => {

		if (active == null) return h('div', { className: 'valuesBar__content' },
			h('p', { className: 'valuesBar__duration color-white' }, formatDuration(averageDuration)),
			h('p', { className: 'valuesBar__description' }, 'Average visit duration')
		)

		const activeValue = props.items[active]
		const isAboveLimit = activeValue.duration >= limit

		const duration = isAboveLimit === true ? `> ${ formatDuration(limit) }` : formatDuration(activeValue.duration)
		const description = `${ activeValue.count } total visits`

		return h('div', { className: 'valuesBar__content' },
			h('p', { className: 'valuesBar__duration color-primary' }, duration),
			h('p', { className: 'valuesBar__description' }, description)
		)

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
							formatDuration(minDuration)
						)
					),
					content,
					h('div', { className: 'valuesBar__line' },
						h('div', { className: 'valuesBar__anchor valuesBar__anchor--top' },
							formatDuration(maxDuration)
						)
					)
				)
			),
			h('div', { className: 'valuesBar__row' },
				h('div', { className: 'valuesBar__bar' },
					aboveLimitItems.map((item, index) => (
						h(Value, {
							key: String(item.duration) + belowLimitItems.length + index,
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
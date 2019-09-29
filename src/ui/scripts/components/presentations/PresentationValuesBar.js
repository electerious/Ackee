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

	const minDuration = props.items.reduce(minByProp('duration'), Number.MAX_SAFE_INTEGER)
	const maxDuration = props.items.reduce(maxByProp('duration'), 0)

	const maxCount = props.items.reduce(maxByProp('count'), 0)
	const proportionalOpacity = ({ count }) => (count / maxCount)

	const content = (() => {

		if (active == null) return h('div', { className: 'valuesBar__content' },
			h('p', { className: 'valuesBar__duration color-white' }, formatDuration(0)),
			h('p', { className: 'valuesBar__description' }, 'Average visit duration')
		)

		const activeValue = props.items[active]

		return h('div', { className: 'valuesBar__content' },
			h('p', { className: 'valuesBar__duration color-primary' }, formatDuration(activeValue.duration)),
			h('p', { className: 'valuesBar__description' }, `${ activeValue.count } total visits`)
		)

	})()

	return (
		h('div', { className: 'valuesBar' },
			h('div', { className: 'valuesBar__bar' },
				props.items.map((item, index) => (
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
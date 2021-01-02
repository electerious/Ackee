import { createElement as h, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import Context, { CONTENT } from './Context'
import IconQuestionMark from './icons/IconQuestionMark'

const calculateX = (measurement) => {

	const padding = 10

	return Math.max(
		padding,
		Math.min(
			// Ensure that the context stays on the screen
			measurement.body.width - measurement.element.width - padding,
			// Ensure that the context is pinned to the target
			measurement.target.relative.x + measurement.target.width / 2 - measurement.element.width / 2
		)
	)

}

const calculateY = (measurement) => {
	return measurement.target.relative.y - measurement.element.height - 10
}

const Tooltip = (props) => {

	const ref = useRef()
	const [ active, setActive ] = useState(false)

	const close = () => setActive(false)
	const toggle = () => setActive(!active)

	const items = [{
		type: CONTENT,
		children: props.children
	}]

	return (
		h('button', {
			ref,
			type: 'button',
			className: 'link tooltip',
			onClick: toggle
		},
			h(IconQuestionMark, {
				className: 'tooltip__icon'
			}),
			active === true && h(Context, {
				targetRef: ref,
				fixed: true,
				x: calculateX,
				y: calculateY,
				tooltip: true,
				items,
				onItemClick: close,
				onAwayClick: close
			}, props.children)
		)
	)

}

Tooltip.propTypes = {
	children: PropTypes.node.isRequired
}

export default Tooltip
import { createElement as h, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useClickAway } from 'react-use'

import runWhenDefined from '../utils/runWhenDefined'
import useMeasure from '../utils/useMeasure'

const Context = (props) => {

	const ref = useRef()
	const measurement = useMeasure(props.targetRef)

	useClickAway(ref, props.onAwayClick, [ 'click' ])

	return createPortal(
		h('div', {
			ref,
			className: 'context',
			style: {
				'--top': runWhenDefined(props.top, measurement),
				'--right': runWhenDefined(props.right, measurement),
				'--bottom': runWhenDefined(props.bottom, measurement),
				'--left': runWhenDefined(props.left, measurement),
				'--x': props.x,
				'--y': props.y
			}
		},
			props.items.map((item, index) => (
				h('button', {
					key: item.label + index,
					className: classNames({
						'context__button': true,
						'link': true,
						'color-white': item.active === true
					}),
					onClick: (e) => {
						item.onClick(e)
						props.onItemClick(e)
					}
				}, item.label)
			))
		),
		document.body
	)

}

Context.propTypes = {
	targetRef: PropTypes.shape({
		current: PropTypes.instanceOf(Element)
	}),
	top: PropTypes.func,
	right: PropTypes.func,
	bottom: PropTypes.func,
	left: PropTypes.func,
	x: PropTypes.string,
	y: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	onItemClick: PropTypes.func.isRequired,
	onAwayClick: PropTypes.func.isRequired
}

export default Context
import { createElement as h, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useClickAway } from 'react-use'

const Context = (props) => {

	const ref = useRef()

	useClickAway(ref, props.onAwayClick, [ 'click' ])

	return createPortal(
		h('div', {
			ref,
			className: 'context',
			style: {
				'--top': props.top,
				'--right': props.right,
				'--bottom': props.bottom,
				'--left': props.left,
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
	top: PropTypes.string,
	right: PropTypes.string,
	bottom: PropTypes.string,
	left: PropTypes.string,
	x: PropTypes.string,
	y: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	onItemClick: PropTypes.func.isRequired,
	onAwayClick: PropTypes.func.isRequired
}

export default Context
import { createElement as h, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useClickAway } from 'react-use'

import useMeasure from '../utils/useMeasure'

export const BUTTON = Symbol()
export const SEPARATOR = Symbol()

const toPixel = (num) => `${ Math.round(num) }px`

const Context = (props) => {

	const ref = useRef()
	const measurement = useMeasure(props.targetRef, ref)

	useClickAway(ref, props.onAwayClick, [ 'click' ])

	const x = measurement == null ? undefined : toPixel(props.x(measurement))
	const y = measurement == null ? undefined : toPixel(props.y(measurement))

	return createPortal(
		h('div', {
			ref,
			className: classNames({
				'context': true,
				'context--floating': props.floating === true,
				'visible': measurement != null
			}),
			style: {
				'--x': x,
				'--y': y
			}
		},
			props.items.map((item, index) => {

				if (item.type === BUTTON) return h('button', {
					key: item.label + index,
					className: classNames({
						context__button: true,
						active: item.active === true,
						link: true
					}),
					onClick: (e) => {
						item.onClick(e)
						props.onItemClick(e)
					}
				},
					h('div', {}, item.label),
					item.description != null && h('div', { className: 'context__description' }, item.description)
				)

				if (item.type === SEPARATOR) return h('div', {
					key: index,
					className: 'context__separator'
				})

			})
		),
		document.body
	)

}

Context.propTypes = {
	targetRef: PropTypes.shape({
		current: PropTypes.instanceOf(Element)
	}),
	x: PropTypes.func.isRequired,
	y: PropTypes.func.isRequired,
	floating: PropTypes.bool,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	onItemClick: PropTypes.func.isRequired,
	onAwayClick: PropTypes.func.isRequired
}

export default Context
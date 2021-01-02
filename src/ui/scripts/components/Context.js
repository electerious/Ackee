import { createElement as h, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import useMeasure from '../hooks/useMeasure'
import useClickAway from '../hooks/useClickAway'
import toPixel from '../utils/toPixel'

import KeyHint from './KeyHint'

export const CONTENT = Symbol()
export const BUTTON = Symbol()
export const SEPARATOR = Symbol()

const Content = (props) => {

	return (
		h('p', {
			className: 'context__content'
		},
			props.children
		)
	)

}

Content.propTypes = {
	children: PropTypes.node.isRequired
}

const Button = (props) => {

	const hasKeyHint = props.keyHint != null
	const hasKeyDescription = props.description != null

	return (
		h('button', {
			className: classNames({
				context__button: true,
				active: props.active === true,
				link: true
			}),
			onClick: props.onClick
		},
			h('div', { className: 'context__head' },
				h('div', { className: 'context__label' }, props.label),
				hasKeyHint === true && h(KeyHint, {}, props.keyHint)
			),
			hasKeyDescription === true && h('div', { className: 'context__description' }, props.description)
		)
	)

}

Button.propTypes = {
	label: PropTypes.string.isRequired,
	description: PropTypes.string,
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	keyHint: PropTypes.node
}

const Separator = () => {

	return (
		h('div', { className: 'context__separator' })
	)

}

const Context = (props) => {

	const ref = useRef()
	const measurement = useMeasure(props.targetRef, ref)

	useClickAway(ref, props.onAwayClick)

	const x = measurement == null ? undefined : toPixel(props.x(measurement))
	const y = measurement == null ? undefined : toPixel(props.y(measurement))

	return createPortal(
		h('div', {
			ref,
			className: classNames({
				'context': true,
				'context--fixed': props.fixed === true,
				'context--tooltip': props.tooltip === true,
				'context--floating': props.floating === true,
				'visible': measurement != null
			}),
			style: {
				'--x': x,
				'--y': y
			}
		},
			props.items.map((item, index) => {

				if (item.type === CONTENT) return h(Content, {
					key: index,
					...item
				})

				if (item.type === BUTTON) return h(Button, {
					key: item.label + index,
					...item,
					onClick: (e) => {
						item.onClick(e)
						props.onItemClick(e)
					}
				})

				if (item.type === SEPARATOR) return h(Separator, {
					key: index
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
	fixed: PropTypes.bool,
	x: PropTypes.func.isRequired,
	y: PropTypes.func.isRequired,
	tooltip: PropTypes.bool,
	floating: PropTypes.bool,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	onItemClick: PropTypes.func.isRequired,
	onAwayClick: PropTypes.func.isRequired
}

export default Context
import { createElement as h, Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isEqual from 'react-fast-compare'

import Context, { BUTTON as DROPDOWN_BUTTON, SEPARATOR as DROPDOWN_SEPARATOR } from './Context'
import IconArrowDown from './icons/IconArrowDown'

import selectRouteKey from '../selectors/selectRouteKey'
import selectRouteParams from '../selectors/selectRouteParams'

const BUTTON = Symbol()
const DROPDOWN = Symbol()

const calculateX = (measurement) => {

	return Math.min(
		// Ensure that the context stays on the screen
		measurement.body.width - measurement.element.width - 10,
		// Ensure that the context is pinned to the target
		measurement.target.absolute.x + measurement.target.width - measurement.element.width
	)

}

const calculateY = (measurement) => {

	return measurement.target.absolute.y + measurement.target.height + 10

}

const Spinner = (props) => {

	return (
		h('div', {
			className: classNames({
				'header__spinner': true,
				'header__spinner--white': props.color === 'white',
				'header__spinner--primary': props.color === 'primary',
				'header__spinner--visible': props.fetching === true
			})
		})
	)

}

const Logo = (props) => {

	const fetching = props.fetching === true

	return (
		h('div', { className: 'header__logo' },
			h(Spinner, { color: 'white', fetching }),
			h(Spinner, { color: 'primary', fetching })
		)
	)

}

const Button = (props) => {

	return (
		h('button', {
			className: classNames({
				'header__button': true,
				'active': props.active === true,
				'link': true,
				'color-white': props.active === true
			}),
			onClick: props.onClick
		}, props.children)
	)

}

const Dropdown = (props) => {

	const ref = useRef()
	const [ active, setActive ] = useState(false)

	const close = () => setActive(false)
	const toggle = () => setActive(!active)

	const containsActiveItem = props.items.some((item) => item.active === true)

	return (
		h(Fragment, {},
			h('button', {
				ref: ref,
				className: classNames({
					'header__button': true,
					'hovered': active === true,
					'active': containsActiveItem === true,
					'link': true,
					'color-white': containsActiveItem === true
				}),
				onClick: toggle
			},
				props.children,
				h(IconArrowDown, { className: 'header__arrow' })
			),
			active === true && h(Context, {
				targetRef: ref,
				x: calculateX,
				y: calculateY,
				items: props.items,
				onItemClick: close,
				onAwayClick: close
			})
		)
	)

}

const Header = (props) => {

	return (
		h('header', { className: 'header' },
			h(Logo, { fetching: props.fetching }),
			h('nav', { className: 'header__nav' },
				h('div', { className: 'header__buttons' },
					props.items.map((item, index) => {

						if (item.type === BUTTON) return h(Button, {
							key: item.label + index,
							...item
						}, item.label)

						if (item.type === DROPDOWN) return h(Dropdown, {
							key: item.label + index,
							...item
						}, item.label)

					})
				)
			)
		)
	)

}

Header.propTypes = {
	fetching: PropTypes.bool.isRequired,
	items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export const createButton = (label, route, props) => ({
	type: BUTTON,
	onClick: () => props.setRouteValue(route),
	active: selectRouteKey(props) === route.key,
	label
})

export const createDropdown = (label, items) => ({
	type: DROPDOWN,
	items,
	label
})

export const createDropdownButton = (label, route, props) => ({
	type: DROPDOWN_BUTTON,
	onClick: () => props.setRouteValue(route),
	active: selectRouteKey(props) === route.key && isEqual(selectRouteParams(props), route.params || {}),
	label
})

export const createDropdownSeparator = () => ({
	type: DROPDOWN_SEPARATOR
})

export default Header
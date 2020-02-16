import { createElement as h, Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Context from './Context'
import IconArrowDown from './icons/IconArrowDown'

const BUTTON = Symbol()
const DROPDOWN = Symbol()

const Spinner = (props) => {

	return (
		h('div', {
			className: classNames({
				'header__spinner': true,
				'header__spinner--black': props.color === 'black',
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
			h(Spinner, { color: 'black', fetching }),
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

	return (
		h(Fragment, {},
			h('button', {
				ref: ref,
				className: 'header__button link',
				onClick: toggle
			},
				props.children,
				h(IconArrowDown, { className: 'header__arrow' })
			),
			active === true && h(Context, {
				targetRef: ref,
				top: (measurement) => `${ measurement.bottom - measurement.scrollY }px`,
				right: (measurement) => `${ Math.max(10, measurement.scrollWidth - measurement.right) }px`,
				y: '10px',
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
	active: props.route.value === route,
	label
})

export const createDropdown = (label, items) => ({
	type: DROPDOWN,
	items,
	label
})

export default Header
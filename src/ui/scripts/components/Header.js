import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Spinner = (props) => (

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

const Logo = (props) => (

	h('div', { className: 'header__logo' },
		h(Spinner, {
			color: 'black',
			fetching: props.fetching === true
		}),
		h(Spinner, {
			color: 'white',
			fetching: props.fetching === true
		}),
		h(Spinner, {
			color: 'primary',
			fetching: props.fetching === true
		})
	)

)

const Button = (props) => (

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

const Header = (props) => (

	h('header', { className: 'header' },
		h(Logo, { fetching: props.fetching }),
		h('nav', {},
			props.items.map((props, index) => (
				h(Button, {
					key: props.label + index,
					...props
				}, props.label)
			))
		)
	)

)

Header.propTypes = {
	fetching: PropTypes.bool.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			active: PropTypes.bool.isRequired,
			onClick: PropTypes.func.isRequired,
			label: PropTypes.string.isRequired
		})
	).isRequired
}

export default Header
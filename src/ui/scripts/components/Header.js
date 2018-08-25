import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const enhance = compose(

	setDisplayName('Header'),

	setPropTypes({
		buttons: PropTypes.arrayOf(
			PropTypes.shape({
				active: PropTypes.bool.isRequired,
				onClick: PropTypes.func.isRequired,
				label: PropTypes.string.isRequired
			})
		).isRequired
	})

)

const Logo = () => (

	h('div', { className: 'header__logo' })

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

const Component = (props) => (

	h('header', { className: 'header' },
		h(Logo),
		h('nav', {}, props.buttons.map(
			(props, index) => h(Button, {
				key: index,
				active: props.active,
				onClick: props.onClick
			}, props.label))
		)
	)

)

export default enhance(Component)
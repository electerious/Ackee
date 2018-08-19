import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'
import classNames from 'classnames'

const enhance = compose(

	setDisplayName('Header')

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
		h('nav', {},
			h(Button, { onClick: props.setRouteTab.bind(null, 'overview'), active: props.route.tab === 'overview' }, 'Overview'),
			h(Button, { onClick: props.setRouteTab.bind(null, 'sites'), active: props.route.tab === 'sites' }, 'Sites'),
			h(Button, { onClick: props.setRouteTab.bind(null, 'settings'), active: props.route.tab === 'settings' }, 'Settings')
		)
	)

)

export default enhance(Component)
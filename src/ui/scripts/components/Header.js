import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

import HeaderLogo from './HeaderLogo'
import HeaderButton from './HeaderButton'

const enhance = compose(

	setDisplayName('Header')

)

const Component = (props) => (

	h('header', { className: 'header' },
		h(HeaderLogo),
		h('nav', {},
			h(HeaderButton, { onClick: props.setRouteTab.bind(null, 'overview'), active: props.route.tab === 'overview' }, 'Overview'),
			h(HeaderButton, { onClick: props.setRouteTab.bind(null, 'sites'), active: props.route.tab === 'sites' }, 'Sites'),
			h(HeaderButton, { onClick: props.setRouteTab.bind(null, 'settings'), active: props.route.tab === 'settings' }, 'Settings')
		)
	)

)

export default enhance(Component)
import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

import * as routes from '../constants/routes'

import Header from './Header'
import Overview from './Overview'
import Settings from './Settings'

const enhance = compose(

	setDisplayName('Dashboard')

)

const Component = (props) => (

	h('div', {},
		h(Header, { items: [
			{ onClick: () => props.setRouteTab(routes.OVERVIEW), active: props.route.tab === routes.OVERVIEW, label: 'Overview' },
			{ onClick: () => props.setRouteTab(routes.DOMAINS), active: props.route.tab === routes.DOMAINS, label: 'Domains' },
			{ onClick: () => props.setRouteTab(routes.SETTINGS), active: props.route.tab === routes.SETTINGS, label: 'Settings' }
		] }),
		h('main', { className: 'content' },
			props.route.tab === routes.OVERVIEW && h(Overview, props),
			props.route.tab === routes.SETTINGS && h(Settings, props)
		)
	)

)

export default enhance(Component)
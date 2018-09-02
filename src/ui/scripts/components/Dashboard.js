import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

import * as routes from '../constants/routes'

import Header from './Header'
import Overview from './Overview'
import Domains from './Domains'
import Settings from './Settings'

const enhance = compose(

	setDisplayName('Dashboard')

)

const Component = (props) => (

	h('div', {},
		h(Header, {
			fetching: (
				props.domains.fetching === true ||
				props.token.fetching === true
			),
			items: [
				{ onClick: () => props.setRouteValue(routes.OVERVIEW), active: props.route.value === routes.OVERVIEW, label: 'Overview' },
				{ onClick: () => props.setRouteValue(routes.DOMAINS), active: props.route.value === routes.DOMAINS, label: 'Domains' },
				{ onClick: () => props.setRouteValue(routes.SETTINGS), active: props.route.value === routes.SETTINGS, label: 'Settings' }
			]
		}),
		h('main', { className: 'content' },
			props.route.value === routes.OVERVIEW && h(Overview, props),
			props.route.value === routes.DOMAINS && h(Domains, props),
			props.route.value === routes.SETTINGS && h(Settings, props)
		)
	)

)

export default enhance(Component)
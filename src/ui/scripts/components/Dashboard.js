import { createElement as h } from 'react'

import {
	ROUTE_VIEWS,
	ROUTE_REFERRERS,
	ROUTE_SETTINGS
} from '../constants/route'

import Header from './Header'
import RouteViews from './routes/RouteViews'
import RouteReferrers from './routes/RouteReferrers'
import RouteSettings from './routes/RouteSettings'

const Component = (props) => (

	h('div', {},
		h(Header, {
			fetching: props.fetching,
			items: [
				{ onClick: () => props.setRouteValue(ROUTE_VIEWS), active: props.route.value === ROUTE_VIEWS, label: 'Views' },
				{ onClick: () => props.setRouteValue(ROUTE_REFERRERS), active: props.route.value === ROUTE_REFERRERS, label: 'Referrers' },
				{ onClick: () => props.setRouteValue(ROUTE_SETTINGS), active: props.route.value === ROUTE_SETTINGS, label: 'Settings' }
			]
		}),
		h('main', { className: 'content' },
			props.route.value === ROUTE_VIEWS && h(RouteViews, props),
			props.route.value === ROUTE_REFERRERS && h(RouteReferrers, props),
			props.route.value === ROUTE_SETTINGS && h(RouteSettings, props)
		)
	)

)

Component.displayName = 'Dashboard'

export default Component
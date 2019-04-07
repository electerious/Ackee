import { createElement as h, Component } from 'react'

import {
	ROUTE_VIEWS,
	ROUTE_REFERRERS,
	ROUTE_SETTINGS
} from '../constants/route'

import Header from './Header'
import RouteViews from './routes/RouteViews'
import RouteReferrers from './routes/RouteReferrers'
import RouteSettings from './routes/RouteSettings'

const Dashboard = class extends Component {

	constructor(props) {

		super(props)

	}

	render() {

		return (
			h('div', {},
				h(Header, {
					fetching: this.props.fetching,
					items: [
						{ onClick: () => this.props.setRouteValue(ROUTE_VIEWS), active: this.props.route.value === ROUTE_VIEWS, label: 'Views' },
						{ onClick: () => this.props.setRouteValue(ROUTE_REFERRERS), active: this.props.route.value === ROUTE_REFERRERS, label: 'Referrers' },
						{ onClick: () => this.props.setRouteValue(ROUTE_SETTINGS), active: this.props.route.value === ROUTE_SETTINGS, label: 'Settings' }
					]
				}),
				h('main', { className: 'content' },
					this.props.route.value === ROUTE_VIEWS && h(RouteViews, this.props),
					this.props.route.value === ROUTE_REFERRERS && h(RouteReferrers, this.props),
					this.props.route.value === ROUTE_SETTINGS && h(RouteSettings, this.props)
				)
			)
		)

	}

}

export default Dashboard
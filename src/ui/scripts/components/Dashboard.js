import { createElement as h, Component } from 'react'

import * as routes from '../constants/routes'

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
						{ onClick: () => this.props.setRouteValue(routes.VIEWS), active: this.props.route.value === routes.VIEWS, label: 'Views' },
						{ onClick: () => this.props.setRouteValue(routes.REFERRERS), active: this.props.route.value === routes.REFERRERS, label: 'Referrers' },
						{ onClick: () => this.props.setRouteValue(routes.SETTINGS), active: this.props.route.value === routes.SETTINGS, label: 'Settings' }
					]
				}),
				h('main', { className: 'content' },
					this.props.route.value === routes.VIEWS && h(RouteViews, this.props),
					this.props.route.value === routes.REFERRERS && h(RouteReferrers, this.props),
					this.props.route.value === routes.SETTINGS && h(RouteSettings, this.props)
				)
			)
		)

	}

}

export default Dashboard
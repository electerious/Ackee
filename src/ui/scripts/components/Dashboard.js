import { createElement as h, Component, Fragment } from 'react'

import * as routes from '../constants/routes'

import Header from './Header'
import Card from './Card'
import Account from './Account'

const Dashboard = class extends Component {

	constructor(props) {

		super(props)

		this.state = {
			data: [
				800,
				300,
				250,
				400,
				550,
				901,
				620,
				800,
				300,
				250,
				400,
				550,
				901,
				620
			]
		}

	}

	render() {

		return (
			h('div', {},
				h(Header, { buttons: [
					{ onClick: () => this.props.setRouteTab(routes.OVERVIEW), active: this.props.route.tab === routes.OVERVIEW, label: 'Overview' },
					{ onClick: () => this.props.setRouteTab(routes.SITES), active: this.props.route.tab === routes.SITES, label: 'Sites' },
					{ onClick: () => this.props.setRouteTab(routes.SETTINGS), active: this.props.route.tab === routes.SETTINGS, label: 'Settings' }
				] }),
				h('main', { className: 'content' },
					this.props.route.tab === routes.OVERVIEW && h(Fragment, {},
						h(Card, {
							wide: true,
							title: 'Page Views',
							data: this.state.data
						})
					),
					this.props.route.tab === routes.SETTINGS && h(Fragment, {},
						h(Account, this.props)
					)
				)
			)
		)

	}

}

export default Dashboard
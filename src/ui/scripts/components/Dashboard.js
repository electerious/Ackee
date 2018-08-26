import { createElement as h, Component, Fragment } from 'react'

import { version } from '../../../../package'
import * as routes from '../constants/routes'

import Header from './Header'
import Card from './Card'
import Setting from './Setting'

const Dashboard = class extends Component {

	constructor(props) {

		super(props)

		this.state = {
			items: [
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
				h(Header, { items: [
					{ onClick: () => this.props.setRouteTab(routes.OVERVIEW), active: this.props.route.tab === routes.OVERVIEW, label: 'Overview' },
					{ onClick: () => this.props.setRouteTab(routes.SITES), active: this.props.route.tab === routes.SITES, label: 'Sites' },
					{ onClick: () => this.props.setRouteTab(routes.SETTINGS), active: this.props.route.tab === routes.SETTINGS, label: 'Settings' }
				] }),
				h('main', { className: 'content' },
					this.props.route.tab === routes.OVERVIEW && h(Fragment, {},
						h(Card, {
							wide: true,
							headline: 'Page Views',
							items: this.state.items
						})
					),
					this.props.route.tab === routes.SETTINGS && h(Fragment, {},
						h(Setting, {
							headline: 'Account',
							items: [
								{ type: 'p', disabled: true, label: 'Version', text: version },
								{ type: 'button', onClick: () => this.props.deleteToken(this.props), label: 'Sign Out' }
							]
						}),
						h(Setting, {
							headline: 'Help',
							items: [
								{ type: 'a', href: '#', label: 'Get started' },
								{ type: 'a', href: '#', label: 'Add Ackee to your sites' },
								{ type: 'a', href: '#', label: 'Change username or password' }
							]
						})
					)
				)
			)
		)

	}

}

export default Dashboard
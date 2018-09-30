import { createElement as h, Component } from 'react'

import * as routes from '../constants/routes'

import Header from './Header'
import Overview from './Overview'
import Domains from './Domains'
import Settings from './Settings'

const Dashboard = class extends Component {

	constructor(props) {

		super(props)

	}

	componentDidMount() {

		this.props.fetchDomains(this.props).then(() => {

			this.props.domains.value.map((props) => {
				this.props.fetchViews(props.data.id, this.props)
			})

		})

	}

	render() {

		return (
			h('div', {},
				h(Header, {
					fetching: (
						this.props.domains.fetching === true ||
						this.props.token.fetching === true
					),
					items: [
						{ onClick: () => this.props.setRouteValue(routes.OVERVIEW), active: this.props.route.value === routes.OVERVIEW, label: 'Overview' },
						{ onClick: () => this.props.setRouteValue(routes.DOMAINS), active: this.props.route.value === routes.DOMAINS, label: 'Domains' },
						{ onClick: () => this.props.setRouteValue(routes.SETTINGS), active: this.props.route.value === routes.SETTINGS, label: 'Settings' }
					]
				}),
				h('main', { className: 'content' },
					this.props.route.value === routes.OVERVIEW && h(Overview, this.props),
					this.props.route.value === routes.DOMAINS && h(Domains, this.props),
					this.props.route.value === routes.SETTINGS && h(Settings, this.props)
				)
			)
		)

	}

}

export default Dashboard
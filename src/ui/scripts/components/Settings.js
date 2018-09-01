import { createElement as h, Component, Fragment } from 'react'

import { version } from '../../../../package'

import Setting from './Setting'

const Dashboard = class extends Component {

	constructor(props) {

		super(props)

	}

	componentDidMount() {

		this.props.fetchDomains(this.props)

	}

	render() {

		return (
			h(Fragment, {},

				h(Setting, {
					headline: 'Account',
					items: [
						{ type: 'p', disabled: true, label: 'Version', text: version },
						{ type: 'button', onClick: () => this.props.deleteToken(this.props), label: 'Sign Out' }
					]
				}),

				h(Setting, {
					headline: 'Domains',
					message: (() => {

						if (this.props.domains.fetching === true) return {
							status: 'warning',
							label: 'Fetching domains...'
						}

						if (this.props.domains.error != null) return {
							status: 'error',
							label: this.props.domains.error
						}

					})(),
					items: (() => {

						if (this.props.domains.fetching === true) return []
						if (this.props.domains.error != null) return []

						return [
							...(this.props.domains.value || []).map(
								(props) => ({ type: 'button', label: props.data.title, text: props.data.id })
							),
							{ type: 'button', label: 'New domain' }
						]

					})()
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

	}

}

export default Dashboard
import { createElement as h, Component, Fragment } from 'react'

import { version } from '../../../../../package'

import CardSetting from '../cards/CardSetting'

const RouteSettings = class extends Component {

	render() {

		return (
			h(Fragment, {},

				h(CardSetting, {
					headline: 'Account',
					items: [
						{ type: 'p', disabled: true, label: 'Version', text: version },
						{ type: 'button', onClick: () => this.props.deleteToken(this.props), label: 'Sign Out' }
					]
				}),

				h(CardSetting, {
					headline: 'Domains',
					message: (() => {

						if (this.props.domains.fetching === true) return {
							status: 'warning',
							label: 'Fetching domains...'
						}

					})(),
					items: (() => {

						if (this.props.domains.fetching === true) return []

						return [
							...this.props.domains.value.map(
								(props) => ({ type: 'button', label: props.data.title, text: props.data.id })
							),
							{ type: 'button', label: 'New domain' }
						]

					})()
				}),

				h(CardSetting, {
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

export default RouteSettings
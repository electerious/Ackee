import { createElement as h, Component, Fragment } from 'react'

import { version } from '../../../../../package'

import CardSetting from '../cards/CardSetting'
import LinkItem from '../LinkItem'
import Line from '../Line'
import Message from '../Message'

const RouteSettings = class extends Component {

	componentDidMount() {

		this.props.fetchDomains(this.props)

	}

	render() {

		const domainsFetching = [
			h(Message, { status: 'warning' }, 'Fetching domains...')
		]

		const domainsItems = [
			...this.props.domains.value.map(
				(props) => h(LinkItem, { type: 'button', text: props.data.id }, props.data.title)
			),
			h(LinkItem, { type: 'button' }, 'New domain')
		]

		return (
			h(Fragment, {},

				h(CardSetting, {
					headline: 'Account'
				},
					h(LinkItem, { type: 'p', disabled: true, text: version }, 'Version'),
					h(Line),
					h(LinkItem, { type: 'button', onClick: () => this.props.deleteToken(this.props) }, 'Sign Out')
				),

				h(CardSetting, {
					headline: 'Domains'
				},
					...(this.props.domains.fetching === true ? domainsFetching : domainsItems)
				),

				h(CardSetting, {
					headline: 'Help'
				},
					h(LinkItem, { type: 'a', href: '#' }, 'Get started'),
					h(Line),
					h(LinkItem, { type: 'a', href: '#' }, 'Add Ackee to your sites'),
					h(Line),
					h(LinkItem, { type: 'a', href: '#' }, 'Change username or password')
				)

			)
		)

	}

}

export default RouteSettings
import { createElement as h, Fragment, useEffect } from 'react'

import { version, homepage } from '../../../../../package'
import { MODALS_DOMAIN_EDIT, MODALS_DOMAIN_ADD } from '../../constants/modals'

import CardSetting from '../cards/CardSetting'
import LinkItem from '../LinkItem'
import Line from '../Line'
import Message from '../Message'

const RouteSettings = (props) => {

	useEffect(() => {

		props.fetchDomains(props)

	}, [])

	const showDomainEditModal = (id, title) => {

		props.addModalsModal({
			type: MODALS_DOMAIN_EDIT,
			props: {
				id,
				title
			}
		})

	}

	const showDomainAddModal = () => {

		props.addModalsModal({
			type: MODALS_DOMAIN_ADD,
			props: {}
		})

	}

	const domainsFetching = [
		h(Message, { status: 'warning' }, 'Fetching domains...')
	]

	const domainsItems = [
		...props.domains.value.map(
			(domain) => [
				h(LinkItem, {
					type: 'button',
					text: domain.data.id,
					onClick: () => showDomainEditModal(domain.data.id, domain.data.title)
				}, domain.data.title),
				h(Line)
			]
		).flat(),
		h(LinkItem, { type: 'button', onClick: showDomainAddModal }, 'New domain')
	]

	return (
		h(Fragment, {},

			h(CardSetting, {
				headline: 'Account'
			},
				h(LinkItem, { type: 'p', disabled: true, text: version }, 'Version'),
				h(Line),
				h(LinkItem, { type: 'button', onClick: () => props.deleteToken(props) }, 'Sign Out')
			),

			h(CardSetting, {
				headline: 'Domains'
			},
				...(props.domains.fetching === true ? domainsFetching : domainsItems)
			),

			h(CardSetting, {
				headline: 'Help'
			},
				h(LinkItem, { type: 'a', href: homepage }, 'Ackee on GitHub'),
				h(Line),
				h(LinkItem, { type: 'a', href: 'https://github.com/electerious/Ackee/blob/master/docs/Get%20started.md' }, 'Get started'),
				h(Line),
				h(LinkItem, { type: 'a', href: 'https://github.com/electerious/ackee-tracker' }, 'Add Ackee to your sites')
			)

		)
	)

}

export default RouteSettings
import { createElement as h, Fragment, useEffect } from 'react'

import { version, homepage } from '../../../../../package'
import { MODALS_DOMAIN_EDIT, MODALS_DOMAIN_ADD, MODALS_PERMANENT_TOKEN_EDIT, MODALS_PERMANENT_TOKEN_ADD } from '../../constants/modals'

import CardSetting from '../cards/CardSetting'
import LinkItem from '../LinkItem'
import Line from '../Line'
import Message from '../Message'

const RouteSettings = (props) => {

	useEffect(() => {

		props.fetchPermanentTokens(props)

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

	const showPermanentTokenEditModal = (id, title) => {

		props.addModalsModal({
			type: MODALS_PERMANENT_TOKEN_EDIT,
			props: {
				id,
				title
			}
		})

	}

	const showPermanentTokenAddModal = () => {

		props.addModalsModal({
			type: MODALS_PERMANENT_TOKEN_ADD,
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
					text: domain.id,
					onClick: () => showDomainEditModal(domain.id, domain.title)
				}, domain.title),
				h(Line)
			]
		).flat(),
		h(LinkItem, { type: 'button', onClick: showDomainAddModal }, 'New domain')
	]

	const permanentTokensFetching = [
		h(Message, { status: 'warning' }, 'Fetching permanent tokens...')
	]

	const permanentTokensItems = [
		...props.permanentTokens.value.map(
			(permanentToken) => [
				h(LinkItem, {
					type: 'button',
					text: permanentToken.id,
					onClick: () => showPermanentTokenEditModal(permanentToken.id, permanentToken.title)
				}, permanentToken.title),
				h(Line)
			]
		).flat(),
		h(LinkItem, { type: 'button', onClick: showPermanentTokenAddModal }, 'New permanent token')
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
				headline: 'Permanent Tokens'
			},
				...(props.permanentTokens.fetching === true ? permanentTokensFetching : permanentTokensItems)
			),

			h(CardSetting, {
				headline: 'Donate'
			},
				h(LinkItem, { type: 'a', href: 'https://github.com/sponsors/electerious', target: '_blank', rel: 'noopener' }, 'Become a GitHub sponsor'),
				h(Line),
				h(LinkItem, { type: 'a', href: 'https://www.buymeacoffee.com/electerious', target: '_blank', rel: 'noopener' }, 'Buy me a coffee'),
				h(Line),
				h(LinkItem, { type: 'a', href: 'https://paypal.me/electerious', target: '_blank', rel: 'noopener' }, 'Donate via PayPal')
			),

			h(CardSetting, {
				headline: 'Help'
			},
				h(LinkItem, { type: 'a', href: 'https://ackee.electerious.com', target: '_blank', rel: 'noopener' }, 'Website and documentation'),
				h(Line),
				h(LinkItem, { type: 'a', href: homepage, target: '_blank', rel: 'noopener' }, 'Ackee on GitHub'),
				h(Line),
				h(LinkItem, { type: 'a', href: 'https://github.com/electerious/ackee-tracker', target: '_blank', rel: 'noopener' }, 'Add Ackee to your sites')
			)

		)
	)

}

export default RouteSettings
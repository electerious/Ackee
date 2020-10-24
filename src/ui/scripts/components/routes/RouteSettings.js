import { createElement as h, Fragment } from 'react'

import { version, homepage } from '../../../../../package'
import { MODALS_DOMAIN_ADD, MODALS_DOMAIN_EDIT, MODALS_EVENT_ADD, MODALS_EVENT_EDIT } from '../../constants/modals'

import CardSetting from '../cards/CardSetting'
import LinkItem from '../LinkItem'
import Line from '../Line'
import Message from '../Message'

const RouteSettings = (props) => {

	const showDomainAddModal = () => {

		props.addModalsModal({
			type: MODALS_DOMAIN_ADD,
			props: {}
		})

	}

	const showDomainEditModal = (domain) => {

		props.addModalsModal({
			type: MODALS_DOMAIN_EDIT,
			props: domain
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
					onClick: () => showDomainEditModal(domain)
				}, domain.title),
				h(Line)
			]
		).flat(),
		h(LinkItem, { type: 'button', onClick: showDomainAddModal }, 'New domain')
	]

	const showEventAddModal = () => {

		props.addModalsModal({
			type: MODALS_EVENT_ADD,
			props: {}
		})

	}

	const showEventEditModal = (event) => {

		props.addModalsModal({
			type: MODALS_EVENT_EDIT,
			props: event
		})

	}

	const eventsFetching = [
		h(Message, { status: 'warning' }, 'Fetching events...')
	]

	const eventsItems = [
		...props.events.value.map(
			(event) => [
				h(LinkItem, {
					type: 'button',
					text: event.id,
					onClick: () => showEventEditModal(event)
				}, event.title),
				h(Line)
			]
		).flat(),
		h(LinkItem, { type: 'button', onClick: showEventAddModal }, 'New event')
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
				headline: 'Events'
			},
				...(props.events.fetching === true ? eventsFetching : eventsItems)
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
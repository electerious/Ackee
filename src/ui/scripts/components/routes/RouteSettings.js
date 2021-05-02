import { createElement as h, Fragment } from 'react'

import { version, homepage } from '../../../../../package.json'
import useDomains from '../../api/hooks/useDomains'
import useEvents from '../../api/hooks/events/useEvents'
import usePermanentTokens from '../../api/hooks/usePermanentTokens'
import status from '../../utils/status'
import {
	MODALS_DOMAIN_ADD,
	MODALS_DOMAIN_EDIT,
	MODALS_EVENT_ADD,
	MODALS_EVENT_EDIT,
	MODALS_PERMANENT_TOKEN_ADD,
	MODALS_PERMANENT_TOKEN_EDIT
} from '../../constants/modals'

import CardSetting from '../cards/CardSetting'
import LinkItem from '../LinkItem'
import Line from '../Line'
import Message from '../Message'

const FetchingMessage = (props) => {

	return h(Message, { status: 'warning' }, `Fetching ${ props.label }...`)

}

const RouteSettings = (props) => {

	const domains = useDomains()
	const events = useEvents()
	const permanentTokens = usePermanentTokens()

	const showModal = (type, data = {}) => {

		props.addModalsModal({
			type,
			props: data
		})

	}

	const createItems = (items, editFn, createFn, createLabel) => [
		...items.map(
			(item) => [
				h(LinkItem, {
					type: 'button',
					text: item.id,
					onClick: () => editFn(item)
				}, item.title),
				h(Line)
			]
		).flat(),
		h(LinkItem, { type: 'button', onClick: createFn }, createLabel)
	]

	const showDomainAddModal = () => showModal(MODALS_DOMAIN_ADD)
	const showDomainEditModal = (domain) => showModal(MODALS_DOMAIN_EDIT, domain)
	const showEventAddModal = () => showModal(MODALS_EVENT_ADD)
	const showEventEditModal = (event) => showModal(MODALS_EVENT_EDIT, event)
	const showPermanentTokenAddModal = () => showModal(MODALS_PERMANENT_TOKEN_ADD)
	const showPermanentTokenEditModal = (permanentToken) => showModal(MODALS_PERMANENT_TOKEN_EDIT, permanentToken)

	const domainsFetching = h(FetchingMessage, { label: 'domains' })
	const eventsFetching = h(FetchingMessage, { label: 'events' })
	const permanentTokensFetching = h(FetchingMessage, { label: 'permanent tokens' })

	const domainsItems = createItems(domains.value, showDomainEditModal, showDomainAddModal, 'New domain')
	const eventsItems = createItems(events.value, showEventEditModal, showEventAddModal, 'New event')
	const permanentTokensItems = createItems(permanentTokens.value, showPermanentTokenEditModal, showPermanentTokenAddModal, 'New permanent token')

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
				...(status(domains.value, domains.fetching).isLoading === true ? [ domainsFetching ] : domainsItems)
			),

			h(CardSetting, {
				headline: 'Events'
			},
				...(status(events.value, events.fetching).isLoading === true ? [ eventsFetching ] : eventsItems)
			),

			h(CardSetting, {
				headline: 'Permanent Tokens'
			},
				...(status(permanentTokens.value, permanentTokens.fetching).isLoading === true ? [ permanentTokensFetching ] : permanentTokensItems)
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
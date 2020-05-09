import { createElement as h, Fragment } from 'react'

import CardNoDomain from './cards/CardNoDomain'
import LinkItem from './LinkItem'
import Text from './Text'
import { MODALS_DOMAIN_ADD } from '../constants/modals'

const NoDomain = (props) => {
	const showDomainAddModal = () => {

		props.addModalsModal({
			type: MODALS_DOMAIN_ADD,
			props: {}
		})

	}

	return (
		h(Fragment, {},
			h(CardNoDomain, { headline: 'Welcome to Ackee' },
				h(Text, { }, 'To start, add a domain using the button below. You can manage your domains in the Settings page.'),
				h(LinkItem, { type: 'button', onClick: showDomainAddModal, primary: true }, 'Add your first domain')
			)
		)
	)
}

export default NoDomain
import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import * as modals from '../../constants/modals'

import Modal from './Modal'
import ModalViews from './ModalViews'
import ModalDurations from './ModalDurations'
import ModalDomainAdd from './ModalDomainAdd'
import ModalDomainEdit from './ModalDomainEdit'
import ModalEventAdd from './ModalEventAdd'
import ModalEventEdit from './ModalEventEdit'
import ModalPermanentTokenAdd from './ModalPermanentTokenAdd'
import ModalPermanentTokenEdit from './ModalPermanentTokenEdit'

const modalComponents = {
	[modals.MODALS_VIEWS]: ModalViews,
	[modals.MODALS_DURATIONS]: ModalDurations,
	[modals.MODALS_DOMAIN_ADD]: ModalDomainAdd,
	[modals.MODALS_DOMAIN_EDIT]: ModalDomainEdit,
	[modals.MODALS_EVENT_ADD]: ModalEventAdd,
	[modals.MODALS_EVENT_EDIT]: ModalEventEdit,
	[modals.MODALS_PERMANENT_TOKEN_ADD]: ModalPermanentTokenAdd,
	[modals.MODALS_PERMANENT_TOKEN_EDIT]: ModalPermanentTokenEdit,
}

const Modals = (props) => {
	return Object.entries(props.modals).map(([ modalId, modalData ], index, modals) => {
		const current = modals.length - 1 === index
		const closeModal = props.removeModal.bind(null, modalId)

		const commonProps = {
			current,
			closeModal,
		}

		return (
			h(Modal, { key: modalId, visible: true, ...commonProps },
				h(modalComponents[modalData.type], {
					...commonProps,
					...modalData.props,
				}),
			)
		)
	})
}

Modals.propTypes = {
	modals: PropTypes.object.isRequired,
	removeModal: PropTypes.func.isRequired,
}

export default Modals
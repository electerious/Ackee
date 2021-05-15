import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import {
	MODALS_DOMAIN_ADD,
	MODALS_DOMAIN_EDIT,
	MODALS_EVENT_ADD,
	MODALS_EVENT_EDIT,
	MODALS_PERMANENT_TOKEN_ADD,
	MODALS_PERMANENT_TOKEN_EDIT
} from '../../constants/modals'

import Modal from './Modal'
import ModalDomainAdd from './ModalDomainAdd'
import ModalDomainEdit from './ModalDomainEdit'
import ModalEventAdd from './ModalEventAdd'
import ModalEventEdit from './ModalEventEdit'
import ModalPermanentTokenAdd from './ModalPermanentTokenAdd'
import ModalPermanentTokenEdit from './ModalPermanentTokenEdit'

const Modals = (props) => {

	return Object.entries(props.modals).map(([ modalId, modalData ], index, modals) => {

		const current = modals.length - 1 === index
		const active = modalData.visible === true
		const closeModal = props.removeModal.bind(null, modalId)

		const commonProps = {
			current,
			active,
			closeModal
		}

		return (
			h(Modal, { key: modalId, visible: modalData.visible, ...commonProps },
				modalData.type === MODALS_DOMAIN_ADD && h(ModalDomainAdd, {
					...commonProps
				}),
				modalData.type === MODALS_DOMAIN_EDIT && h(ModalDomainEdit, {
					...commonProps,
					id: modalData.props.id,
					title: modalData.props.title
				}),
				modalData.type === MODALS_EVENT_ADD && h(ModalEventAdd, {
					...commonProps
				}),
				modalData.type === MODALS_EVENT_EDIT && h(ModalEventEdit, {
					...commonProps,
					id: modalData.props.id,
					title: modalData.props.title,
					type: modalData.props.type
				}),
				modalData.type === MODALS_PERMANENT_TOKEN_ADD && h(ModalPermanentTokenAdd, {
					...commonProps
				}),
				modalData.type === MODALS_PERMANENT_TOKEN_EDIT && h(ModalPermanentTokenEdit, {
					...commonProps,
					id: modalData.props.id,
					title: modalData.props.title
				})
			)
		)

	})

}

Modals.propTypes = {
	modals: PropTypes.object.isRequired,
	removeModal: PropTypes.func.isRequired
}

export default Modals
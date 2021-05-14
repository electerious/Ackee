import { createElement as h, Fragment } from 'react'

import {
	MODALS_DOMAIN_ADD,
	MODALS_DOMAIN_EDIT,
	MODALS_EVENT_ADD,
	MODALS_EVENT_EDIT,
	MODALS_PERMANENT_TOKEN_ADD,
	MODALS_PERMANENT_TOKEN_EDIT
} from '../constants/modals'

import Modal from './modals/Modal'
import ModalDomainAdd from './modals/ModalDomainAdd'
import ModalDomainEdit from './modals/ModalDomainEdit'
import ModalEventAdd from './modals/ModalEventAdd'
import ModalEventEdit from './modals/ModalEventEdit'
import ModalPermanentTokenAdd from './modals/ModalPermanentTokenAdd'
import ModalPermanentTokenEdit from './modals/ModalPermanentTokenEdit'

const Modals = (props) => {

	const modals = Object.entries(props.modals).map(([ modalId, modalData ], index, modals) => {

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

	return (
		h(Fragment, {}, ...modals)
	)

}

export default Modals
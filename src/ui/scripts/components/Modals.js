import { createElement as h, Fragment } from 'react'

import {
	MODALS_DOMAIN_EDIT,
	MODALS_DOMAIN_ADD,
	MODALS_PERMANENT_TOKEN_EDIT,
	MODALS_PERMANENT_TOKEN_ADD
} from '../constants/modals'

import Modal from './modals/Modal'
import ModalDomainEdit from './modals/ModalDomainEdit'
import ModalDomainAdd from './modals/ModalDomainAdd'
import ModalPermanentTokenEdit from './modals/ModalPermanentTokenEdit'
import ModalPermanentTokenAdd from './modals/ModalPermanentTokenAdd'

const Modals = (props) => {

	const modals = Object.entries(props.modals.value).map(([ modalId, modalData ], index, modals) => {

		const current = modals.length - 1 === index
		const closeModal = props.removeModalsModal.bind(null, modalId)

		return (
			h(Modal, { key: modalId, visible: modalData.visible },
				modalData.type === MODALS_DOMAIN_EDIT && h(ModalDomainEdit, {
					current,
					id: modalData.props.id,
					title: modalData.props.title,
					fetching: props.domains.fetching,
					updateDomain: props.updateDomain.bind(null, props),
					deleteDomain: props.deleteDomain.bind(null, props),
					closeModal
				}),
				modalData.type === MODALS_DOMAIN_ADD && h(ModalDomainAdd, {
					current,
					fetching: props.domains.fetching,
					addDomain: props.addDomain.bind(null, props),
					closeModal
				}),
				modalData.type === MODALS_PERMANENT_TOKEN_EDIT && h(ModalPermanentTokenEdit, {
					current,
					id: modalData.props.id,
					title: modalData.props.title,
					fetching: props.permanentTokens.fetching,
					updatePermanentToken: props.updatePermanentToken.bind(null, props),
					deletePermanentToken: props.deletePermanentToken.bind(null, props),
					closeModal
				}),
				modalData.type === MODALS_PERMANENT_TOKEN_ADD && h(ModalPermanentTokenAdd, {
					current,
					fetching: props.permanentTokens.fetching,
					addPermanentToken: props.addPermanentToken.bind(null, props),
					closeModal
				})
			)
		)

	})

	return (
		h(Fragment, {}, ...modals)
	)

}

export default Modals
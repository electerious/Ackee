import { createElement as h, Fragment } from 'react'

import {
	MODALS_DOMAIN_EDIT,
	MODALS_DOMAIN_ADD
} from '../constants/modals'

import Modal from './modals/Modal'
import ModalDomainEdit from './modals/ModalDomainEdit'
import ModalDomainAdd from './modals/ModalDomainAdd'

const Modals = (props) => {

	const modals = Object.entries(props.modals.value).map(([ modalId, modalData ]) => {

		const closeModal = props.removeModalsModal.bind(null, modalId)

		return (
			h(Modal, { key: modalId, visible: modalData.visible },
				modalData.type === MODALS_DOMAIN_EDIT && h(ModalDomainEdit, {
					id: modalData.props.id,
					title: modalData.props.title,
					fetching: props.domains.fetching,
					updateDomain: props.updateDomain.bind(null, props),
					deleteDomain: props.deleteDomain.bind(null, props),
					closeModal
				}),
				modalData.type === MODALS_DOMAIN_ADD && h(ModalDomainAdd, {
					fetching: props.domains.fetching,
					addDomain: props.addDomain.bind(null, props),
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
import { createElement as h, Fragment } from 'react'

import {
	MODALS_DOMAIN_ADD,
	MODALS_DOMAIN_EDIT,
	MODALS_EVENT_ADD,
	MODALS_EVENT_EDIT
} from '../constants/modals'

import Modal from './modals/Modal'
import ModalDomainAdd from './modals/ModalDomainAdd'
import ModalDomainEdit from './modals/ModalDomainEdit'
import ModalEventAdd from './modals/ModalEventAdd'
import ModalEventEdit from './modals/ModalEventEdit'

const Modals = (props) => {

	const modals = Object.entries(props.modals.value).map(([ modalId, modalData ], index, modals) => {

		const current = modals.length - 1 === index
		const closeModal = props.removeModalsModal.bind(null, modalId)

		return (
			h(Modal, { key: modalId, visible: modalData.visible },
				modalData.type === MODALS_DOMAIN_ADD && h(ModalDomainAdd, {
					current,
					fetching: props.domains.fetching,
					addDomain: props.addDomain.bind(null, props),
					closeModal
				}),
				modalData.type === MODALS_DOMAIN_EDIT && h(ModalDomainEdit, {
					current,
					id: modalData.props.id,
					title: modalData.props.title,
					fetching: props.domains.fetching,
					updateDomain: props.updateDomain.bind(null, props),
					deleteDomain: props.deleteDomain.bind(null, props),
					closeModal
				}),
				modalData.type === MODALS_EVENT_ADD && h(ModalEventAdd, {
					current,
					fetching: props.events.fetching,
					addEvent: props.addEvent.bind(null, props),
					closeModal
				}),
				modalData.type === MODALS_EVENT_EDIT && h(ModalEventEdit, {
					current,
					id: modalData.props.id,
					title: modalData.props.title,
					type: modalData.props.type,
					fetching: props.events.fetching,
					updateEvent: props.updateEvent.bind(null, props),
					deleteEvent: props.deleteEvent.bind(null, props),
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
import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import * as modals from '../../constants/modals.js'

import Modal from './modal.js'
import ModalDomainAdd from './modal-domain-add.js'
import ModalDomainEdit from './modal-domain-edit.js'
import ModalDurations from './modal-durations.js'
import ModalEventAdd from './modal-event-add.js'
import ModalEventEdit from './modal-event-edit.js'
import ModalPermanentTokenAdd from './modal-permanent-token-add.js'
import ModalPermanentTokenEdit from './modal-permanent-token-edit.js'
import ModalViews from './modal-views.js'

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
  return Object.entries(props.modals).map(([modalId, modalData], index, modals) => {
    const current = modals.length - 1 === index
    const closeModal = props.removeModal.bind(null, modalId)

    const commonProps = {
      current,
      closeModal,
    }

    return h(
      Modal,
      { key: modalId, visible: true, ...commonProps },
      h(modalComponents[modalData.type], {
        ...commonProps,
        ...modalData.props,
      }),
    )
  })
}

Modals.propTypes = {
  modals: PropTypes.object.isRequired,
  removeModal: PropTypes.func.isRequired,
}

export default Modals

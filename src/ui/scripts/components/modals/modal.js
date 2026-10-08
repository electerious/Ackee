import PropTypes from 'prop-types'
import { Fragment, createElement as h, ViewTransition } from 'react'

import useHotkey from '../../hooks/use-hotkey.js'
import commonModalProps from '../../utils/common-modal-props.js'

const createViewTransition = (name, child) =>
  h(
    ViewTransition,
    {
      default: 'none',
      enter: `${name}-enter`,
      exit: `${name}-exit`,
    },
    child,
  )

const Modal = (props) => {
  useHotkey('escape', props.closeModal, {
    enabled: props.current === true,
    enabledOnInput: true,
  })

  return h(
    Fragment,
    null,
    createViewTransition('modal-backdrop', h('div', { className: 'modal-backdrop' })),
    createViewTransition(
      'modal-panel',
      h('div', { className: 'modal-panel' }, h('div', { className: 'modal-panel__inner' }, props.children)),
    ),
  )
}

Modal.propTypes = {
  ...commonModalProps,
  children: PropTypes.node.isRequired,
}

export default Modal

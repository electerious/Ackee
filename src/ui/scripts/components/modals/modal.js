import classNames from 'classnames'
import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import useHotkey from '../../hooks/use-hotkey.js'
import commonModalProps from '../../utils/common-modal-props.js'

const Modal = (props) => {
  useHotkey('escape', props.closeModal, {
    enabled: props.current === true,
    enabledOnInput: true,
  })

  return h(
    'div',
    {
      className: classNames({
        modal: true,
        visible: props.visible === true,
      }),
    },
    h('div', { className: 'modal__inner' }, props.children),
  )
}

Modal.propTypes = {
  ...commonModalProps,
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal

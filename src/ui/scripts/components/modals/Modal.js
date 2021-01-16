import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useHotkeys } from 'react-hotkeys-hook'

import commonModalProps from '../../utils/commonModalProps'

const Modal = (props) => {

	useHotkeys('esc', props.closeModal, {
		filter: () => props.current === true,
		enableOnTags: [ 'INPUT', 'SELECT', 'TEXTAREA' ]
	})

	return (
		h('div', {
			className: classNames({
				modal: true,
				visible: props.visible === true
			})
		},
			h('div', { className: 'modal__inner' }, props.children)
		)
	)

}

Modal.propTypes = {
	...commonModalProps,
	visible: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired
}

export default Modal
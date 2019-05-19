import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Modal = (props) => {

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
	visible: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired
}

export default Modal
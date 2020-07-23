import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const KeyHint = (props) => {

	return (
		h('div', { className: 'keyHint' }, props.children)
	)

}

KeyHint.propTypes = {
	children: PropTypes.node.isRequired
}

export default KeyHint
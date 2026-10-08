import PropTypes from 'prop-types'
import { createElement as h } from 'react'

const KeyHint = (props) => {
  return h('div', { className: 'keyHint' }, props.children)
}

KeyHint.propTypes = {
  children: PropTypes.node.isRequired,
}

export default KeyHint

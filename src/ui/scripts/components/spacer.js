import PropTypes from 'prop-types'
import { createElement as h } from 'react'

const Spacer = (props) => {
  return h('div', {
    className: 'spacer',
    style: {
      '--size': props.size,
    },
  })
}

Spacer.propTypes = {
  size: PropTypes.number.isRequired,
}

export default Spacer

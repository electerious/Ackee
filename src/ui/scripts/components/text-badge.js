import classNames from 'classnames'
import PropTypes from 'prop-types'
import { createElement as h } from 'react'

const TextBadge = (props) => {
  return h(
    'div',
    {
      className: classNames('badge', `badge--${props.type}`, props.isLive && 'badge--live'),
    },
    h(
      'span',
      {
        className: 'badge__value',
      },
      props.value,
    ),
  )
}

TextBadge.propTypes = {
  isLive: PropTypes.bool,
  type: PropTypes.oneOf(['positive', 'negative', 'neutral']).isRequired,
  value: PropTypes.string.isRequired,
}

export default TextBadge

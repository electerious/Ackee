import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import CurrentStatus from '../current-status.js'
import Headline from '../headline.js'
import PresentationCounterList from '../presentations/presentation-counter-list.js'
import Text from '../text.js'

import useCombinedDurations from '../../api/hooks/durations/use-combined-durations.js'
import commonModalProps from '../../utils/common-modal-props.js'
import formatDuration from '../../utils/format-duration.js'
import relativeFn from '../../utils/relative-fn.js'

const formatter = (ms) => formatDuration(ms).toString()

const ModalDurations = (props) => {
  const { value, status } = useCombinedDurations({
    interval: props.interval,
    limit: props.limit,
  })

  return h(
    'div',
    { className: 'card' },
    h(
      'div',
      { className: 'card__inner' },

      h(
        Headline,
        {
          type: 'h2',
          size: 'medium',
        },
        'Durations',
      ),
      h(
        Text,
        {
          type: 'div',
          spacing: false,
        },
        h(CurrentStatus, status, relativeFn(props.interval)(props.index)),
      ),
      h(PresentationCounterList, {
        items: value[props.index],
        formatter,
      }),
    ),
    h(
      'div',
      { className: 'card__footer' },

      h(
        'button',
        {
          type: 'button',
          className: 'card__button card__button--primary link',
          onClick: props.closeModal,
        },
        'Close',
      ),
    ),
  )
}

ModalDurations.propTypes = {
  ...commonModalProps,
  index: PropTypes.number.isRequired,
  interval: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
}

export default ModalDurations

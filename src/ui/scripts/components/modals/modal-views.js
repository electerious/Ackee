import PropTypes from 'prop-types'
import { createElement as h } from 'react'

import { VIEWS_TYPE_TOTAL, VIEWS_TYPE_UNIQUE } from '../../../../constants/views.js'

import CurrentStatus from '../current-status.js'
import Headline from '../headline.js'
import PresentationCounterList from '../presentations/presentation-counter-list.js'
import Text from '../text.js'

import useCombinedViews from '../../api/hooks/views/use-combined-views.js'
import commonModalProps from '../../utils/common-modal-props.js'
import formatCount from '../../utils/format-count.js'
import relativeFn from '../../utils/relative-fn.js'

const ModalViews = (props) => {
  const { value, status } = useCombinedViews({
    interval: props.interval,
    type: props.type,
    limit: props.limit,
  })

  const headline = {
    [VIEWS_TYPE_UNIQUE]: 'Site Views',
    [VIEWS_TYPE_TOTAL]: 'Page Views',
  }[props.type]

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
        headline,
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
        formatter: formatCount,
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

ModalViews.propTypes = {
  ...commonModalProps,
  index: PropTypes.number.isRequired,
  interval: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
}

export default ModalViews

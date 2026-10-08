import PropTypes from 'prop-types'
import { createElement as h, useCallback, useEffect, useState } from 'react'

import { SORTINGS_NEW, SORTINGS_RECENT } from '../../../../constants/sortings.js'

import rangeLabel from '../../utils/range-label.js'
import relativeDate from '../../utils/relative-date.js'

import PresentationIconList from '../presentations/presentation-icon-list.js'

const textLabel = (item, range, isRecent, isNew) => {
  if (item && item.date) return relativeDate(item.date)
  if (item && item.count) return `${item.count} ${item.count === 1 ? 'visit' : 'visits'}`

  if (isRecent) return 'Recent'
  if (isNew) return 'New'

  return rangeLabel(range)
}

const RendererReferrers = (props) => {
  // Index of the active element
  const [active, setActive] = useState()

  const onItemEnter = useCallback((index) => setActive(index), [setActive])
  const onItemLeave = useCallback(() => setActive(), [setActive])

  const label = textLabel(
    props.items[active],
    props.range,
    props.sorting === SORTINGS_RECENT,
    props.sorting === SORTINGS_NEW,
  )
  useEffect(() => props.setStatusLabel(label), [label])

  return h(PresentationIconList, {
    items: props.items,
    onItemEnter,
    onItemLeave,
  })
}

RendererReferrers.propTypes = {
  items: PropTypes.array.isRequired,
  sorting: PropTypes.string.isRequired,
  range: PropTypes.string.isRequired,
  setStatusLabel: PropTypes.func.isRequired,
}

export default RendererReferrers

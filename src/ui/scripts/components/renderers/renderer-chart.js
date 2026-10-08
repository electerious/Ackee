import PropTypes from 'prop-types'
import { createElement as h, useCallback, useEffect, useState } from 'react'

import relativeFn from '../../utils/relative-fn.js'

import PresentationBarChart from '../presentations/presentation-bar-chart.js'

const textLabel = (active, interval) => {
  return relativeFn(interval)(active)
}

const RendererChart = (props) => {
  // Index of the active element
  const [active, setActive] = useState(0)

  const onItemEnter = useCallback((index) => setActive(index), [setActive])
  const onItemLeave = useCallback(() => setActive(0), [setActive])

  const label = textLabel(active, props.interval)
  useEffect(() => props.setStatusLabel(label), [label])

  return h(PresentationBarChart, {
    items: props.items,
    formatter: props.formatter,
    active,
    onItemEnter,
    onItemLeave,
    onItemClick: props.onItemClick,
  })
}

RendererChart.propTypes = {
  items: PropTypes.array.isRequired,
  interval: PropTypes.string.isRequired,
  formatter: PropTypes.func.isRequired,
  setStatusLabel: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
}

export default RendererChart

import { createElement as h } from 'react'

import formatNumber from '../../utils/format-number.js'

import RendererChart from './renderer-chart.js'

export default (props) =>
  h(RendererChart, {
    ...props,
    formatter: formatNumber,
  })

import { createElement as h } from 'react'

import formatFloat from '../../utils/format-float.js'

import RendererChart from './renderer-chart.js'

export default (props) =>
  h(RendererChart, {
    ...props,
    formatter: formatFloat,
  })

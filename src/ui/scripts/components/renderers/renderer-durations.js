import { createElement as h } from 'react'

import formatDuration from '../../utils/format-duration.js'

import RendererChart from './renderer-chart.js'

const formatter = (ms) => formatDuration(ms).toString()

export default (props) =>
  h(RendererChart, {
    ...props,
    formatter,
  })

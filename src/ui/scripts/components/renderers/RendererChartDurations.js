import { createElement as h } from 'react'

import formatDuration from '../../utils/formatDuration'

import RendererChart from './RendererChart'

export default (props) => h(RendererChart, {
	...props,
	formatter: (ms) => formatDuration(ms).toString()
})
import { createElement as h } from 'react'

import formatDuration from '../../utils/formatDuration'

import RendererChart from './RendererChart'

const formatter = (ms) => formatDuration(ms).toString()

export default (props) => h(RendererChart, {
	...props,
	formatter,
})
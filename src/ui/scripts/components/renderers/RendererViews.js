import { createElement as h } from 'react'

import formatNumber from '../../utils/formatNumber'

import RendererChart from './RendererChart'

export default (props) => h(RendererChart, {
	...props,
	formatter: formatNumber,
})
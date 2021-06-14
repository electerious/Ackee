import { createElement as h } from 'react'

import formatFloat from '../../utils/formatFloat'

import RendererChart from './RendererChart'

export default (props) => h(RendererChart, {
	...props,
	formatter: formatFloat,
})
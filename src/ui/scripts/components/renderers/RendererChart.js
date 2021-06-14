import { createElement as h, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import relativeFn from '../../utils/relativeFn'

import PresentationBarChart from '../presentations/PresentationBarChart'

const textLabel = (active, interval) => {
	return relativeFn(interval)(active)
}

const RendererChart = (props) => {
	// Index of the active element
	const [ active, setActive ] = useState(0)

	const onItemEnter = useCallback((index) => setActive(index), [ setActive ])
	const onItemLeave = useCallback(() => setActive(0), [ setActive ])

	const label = textLabel(active, props.interval)
	useEffect(() => props.setStatusLabel(label), [ label ])

	return h(PresentationBarChart, {
		items: props.items,
		formatter: props.formatter,
		active: active,
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
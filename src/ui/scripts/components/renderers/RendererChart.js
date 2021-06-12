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

	const onColumnEnter = useCallback((index) => setActive(index), [ setActive ])
	const onColumnLeave = useCallback(() => setActive(0), [ setActive ])

	const label = textLabel(active, props.interval)
	useEffect(() => props.setStatusLabel(label), [ label ])

	return h(PresentationBarChart, {
		items: props.items,
		formatter: props.formatter,
		active: active,
		onColumnEnter,
		onColumnLeave,
		onColumnClick: props.onColumnClick,
	})
}

RendererChart.propTypes = {
	items: PropTypes.array.isRequired,
	interval: PropTypes.string.isRequired,
	formatter: PropTypes.func.isRequired,
	setStatusLabel: PropTypes.func.isRequired,
	onColumnClick: PropTypes.func,
}

export default RendererChart
import { createElement as h, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../../../../constants/intervals'

import PresentationBarChart from '../presentations/PresentationBarChart'
import relativeDays from '../../utils/relativeDays'
import relativeMonths from '../../utils/relativeMonths'
import relativeYears from '../../utils/relativeYears'

const relativeFn = (interval) => {
	switch (interval) {
		case INTERVALS_DAILY: return relativeDays
		case INTERVALS_MONTHLY: return relativeMonths
		case INTERVALS_YEARLY: return relativeYears
	}
}

const textLabel = (active, interval) => {
	return relativeFn(interval)(active)
}

const RendererChart = (props) => {
	// Index of the active element
	const [ active, setActive ] = useState(0)

	const onEnter = useCallback((index) => setActive(index), [ setActive ])
	const onLeave = useCallback(() => setActive(0), [ setActive ])

	const label = textLabel(active, props.interval)
	useEffect(() => props.setStatusLabel(label), [ label ])

	return h(PresentationBarChart, {
		items: props.items,
		formatter: props.formatter,
		active: active,
		onEnter,
		onLeave,
	})
}

RendererChart.propTypes = {
	items: PropTypes.array.isRequired,
	interval: PropTypes.string.isRequired,
	formatter: PropTypes.func.isRequired,
	setStatusLabel: PropTypes.func.isRequired,
}

export default RendererChart
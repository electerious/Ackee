import { createElement as h, useState, useEffect } from 'react'
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

	const items = props.widget.value
	const { interval } = props.widget.variables

	// Index of the active element
	const [ active, setActive ] = useState(0)

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive(0)

	const label = textLabel(active, interval)
	useEffect(() => props.setStatusLabel(label), [ label ])

	return h(PresentationBarChart, {
		items,
		formatter: props.formatter,
		active: active,
		onEnter,
		onLeave
	})

}

RendererChart.propTypes = {
	widget: PropTypes.object.isRequired,
	setStatusLabel: PropTypes.func.isRequired
}

export default RendererChart
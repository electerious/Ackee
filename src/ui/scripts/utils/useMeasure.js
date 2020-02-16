import React, { useState } from 'react'
import { useInterval } from 'react-use'

const keys = [
	'top',
	'right',
	'bottom',
	'left',
	'width',
	'height',
	'x',
	'y'
]

const getMeasurement = (ref) => {

	const documentBoundingClientRect = document.scrollingElement.getBoundingClientRect()
	const refBoundingClientRect = ref.current.getBoundingClientRect()

	return {
		top: refBoundingClientRect.top,
		right: refBoundingClientRect.right,
		bottom: refBoundingClientRect.bottom,
		left: refBoundingClientRect.left,
		width: refBoundingClientRect.width,
		height: refBoundingClientRect.height,
		x: refBoundingClientRect.x,
		y: refBoundingClientRect.y,
		scrollX: documentBoundingClientRect.x,
		scrollY: documentBoundingClientRect.y
	}

}

const shouldStateUpdate = (prevState = {}, nextState = {}) => {

	// No need to check scrollX and scrollY. When the scroll position
	// changes the x and y values changes anyway.
	return keys.some((key) => prevState[key] !== nextState[key])

}

export default (ref) => {

	const [ measurement, setMeasurement ] = useState()

	useInterval(() => {

		if (ref.current == null) return

		const nextMeasurement = getMeasurement(ref)
		const needUpdate = shouldStateUpdate(measurement, nextMeasurement)

		if (needUpdate === true) setMeasurement(nextMeasurement)

	}, 10)

	return measurement

}
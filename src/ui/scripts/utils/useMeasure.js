import React, { useState } from 'react'
import { useRafLoop } from 'react-use'
import isEqual from 'react-fast-compare'

const getMeasurement = (targetRef, elementRef) => {

	const scrollingBoundingClientRect = document.scrollingElement.getBoundingClientRect()
	const targetBoundingClientRect = targetRef.current.getBoundingClientRect()
	const elementBoundingClientRect = elementRef.current.getBoundingClientRect()

	const body = {
		width: scrollingBoundingClientRect.width,
		height: scrollingBoundingClientRect.height,
		relative: {
			x: scrollingBoundingClientRect.left,
			y: scrollingBoundingClientRect.top
		},
		absolute: {
			x: scrollingBoundingClientRect.left,
			y: scrollingBoundingClientRect.top
		}
	}

	const target = {
		width: targetBoundingClientRect.width,
		height: targetBoundingClientRect.height,
		relative: {
			x: targetBoundingClientRect.left,
			y: targetBoundingClientRect.top
		},
		absolute: {
			x: targetBoundingClientRect.left + scrollingBoundingClientRect.left * -1,
			y: targetBoundingClientRect.top + scrollingBoundingClientRect.top * -1
		}
	}

	const element = {
		width: elementBoundingClientRect.width,
		height: elementBoundingClientRect.height
	}

	return {
		body,
		target,
		element
	}

}

export default (targetRef, elementRef) => {

	const [ measurement, setMeasurement ] = useState()

	useRafLoop(() => {

		if (targetRef.current == null) return
		if (elementRef.current == null) return

		const nextMeasurement = getMeasurement(targetRef, elementRef)
		const needsStateUpdate = isEqual(measurement || {}, nextMeasurement) === false

		if (needsStateUpdate === false) return

		setMeasurement(nextMeasurement)

	}, true)

	return measurement

}
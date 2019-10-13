import React, { useEffect, useRef } from 'react'

export default (fn, deps) => {

	const didMount = useRef(false)

	useEffect(() => {
		if (didMount.current === true) fn()
		didMount.current = true
	}, deps)

}
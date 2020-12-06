import { useEffect, useState } from 'react'

export default (ref, fn) => {

	const [ ready, setReady ] = useState(false)

	useEffect(() => {
		const rAF = requestAnimationFrame(() => setReady(true))
		return () => cancelAnimationFrame(rAF)
	}, [])

	useEffect(() => {
		// Don't listen to events immediately to avoid that the click
		// event shows and hides the component in the same step.
		if (ready === false) return

		const handler = (e) => {
			// Only continue with handler when a ref exists
			const hasRef = ref != null && ref.current != null
			if (hasRef === false) return

			// Only close when click is outside of target
			const isTarget = ref.current.contains(e.target) === true
			if (isTarget === true) return

			fn()
		}

		document.addEventListener('click', handler)
		return () => document.removeEventListener('click', handler)
	}, [ fn, ready ])

}
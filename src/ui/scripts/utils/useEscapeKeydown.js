import { useEffect } from 'react'

export default (fn) => {
	const handler = (event) => {
		const key = event.keyCode || event.which || event.charCode
		if (key !== 27) return
		fn()
	}

	useEffect(() => {
		window.addEventListener('keydown', handler)

		return () => {
			window.removeEventListener('keydown', handler)
		}
	}, [])
}
import { useEffect } from 'react'

export default (fn, filter = () => true) => {
	const handler = (event) => {
		const key = event.keyCode || event.which || event.charCode
		if (key !== 27 || !filter()) return
		fn()
	}

	useEffect(() => {
		window.addEventListener('keydown', handler)

		return () => {
			window.removeEventListener('keydown', handler)
		}
	}, [])
}
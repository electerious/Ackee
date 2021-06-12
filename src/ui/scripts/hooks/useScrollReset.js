import { useEffect } from 'react'

export default (route) => {
	useEffect(() => {
		document.scrollingElement.scrollTop = 0
	}, [ route ])
}
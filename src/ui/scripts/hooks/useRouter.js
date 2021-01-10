import { createElement as h, useEffect, useMemo, useCallback, useState } from 'react'
import { createHashHistory } from 'history'

import routes, { defaultRoute } from '../constants/routes'

const parseLocation = ({ pathname }) => {

	const hasRoute = routes.some((route) =>
		route.pattern.match(pathname) != null
	)

	if (hasRoute === true) return pathname
	return defaultRoute.pattern.stringify()

}

export default () => {

	const history = useMemo(() => {
		return createHashHistory()
	}, [])

	// Use the initial location
	const [ pathname, setLocalPathname ] = useState(parseLocation(history.location))

	useEffect(() => {

		// Store the location when the user navigates
		return history.listen(({ location }) => {
			setLocalPathname(parseLocation(location))
		})

	}, [ history ])

	// Provide a simple wrapper for the push function
	const setPathname = useCallback((pathname) => {

		history.push({ pathname })

	}, [ history ])

	return [ setPathname, pathname ]

}
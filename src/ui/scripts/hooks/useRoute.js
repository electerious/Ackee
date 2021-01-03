import { createElement as h, useMemo } from 'react'

import routes from '../constants/routes'

export default (pathname) => {

	return useMemo(() => {

		const match = routes.find((route) =>
			route.pattern.match(pathname) != null
		)

		return {
			...match,
			params: match.pattern.match(pathname)
		}

	}, [ pathname ])

}
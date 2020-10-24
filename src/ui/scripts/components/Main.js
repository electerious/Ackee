import { createElement as h, Fragment, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import isUnknownError from '../utils/isUnknownError'

import OverlayFailure from './overlays/OverlayFailure'
import OverlayLogin from './overlays/OverlayLogin'
import ErrorFallback from './ErrorFallback'
import Filter from './Filter'
import Dashboard from './Dashboard'

const Main = (props) => {

	useEffect(() => {
		const isWindows = navigator.platform.includes('Win') === true
		if (isWindows === false) return

		// Use custom scrollbars on Windows because they look ugly
		document.body.classList.add('customScrollbar')
		return () => document.body.classList.remove('customScrollbar')
	}, [])

	// Only handle errors not handled by other components
	const unknownErrors = props.errors.filter(isUnknownError)

	const hasError = unknownErrors.length !== 0
	const hasToken = props.token.value.id != null

	const showOverlayFailure = hasError === true
	const showOverlayLogin = hasError === false && hasToken === false
	const showDashboard = hasError === false && hasToken === true

	if (showOverlayFailure === true) return h(OverlayFailure, { errors: unknownErrors })
	if (showOverlayLogin === true) return h(OverlayLogin, { token: props.token, addToken: props.addToken.bind(null, props) })

	if (showDashboard === true) return h(Fragment, {},
		h(Filter, props),
		h(Dashboard, props)
	)

}

export default withErrorBoundary(Main, {
	FallbackComponent: ErrorFallback
})
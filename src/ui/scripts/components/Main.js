import { createElement as h, Fragment } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import isUnknownError from '../utils/isUnknownError'

import OverlayFailure from './overlays/OverlayFailure'
import OverlayLogin from './overlays/OverlayLogin'
import ErrorFallback from './ErrorFallback'
import Filter from './Filter'
import Dashboard from './Dashboard'

const Main = (props) => {

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
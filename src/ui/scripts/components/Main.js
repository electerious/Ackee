import { createElement as h, Fragment } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import isUnknownError from '../utils/isUnknownError'
import useCustomScrollbar from '../hooks/useCustomScrollbar'
import useRouter from '../hooks/useRouter'

import OverlayFailure from './overlays/OverlayFailure'
import OverlayLogin from './overlays/OverlayLogin'
import ErrorFallback from './ErrorFallback'
import Filter from './Filter'
import Dashboard from './Dashboard'

const Main = (props) => {

	useCustomScrollbar()
	const [ setRoute, route ] = useRouter()

	const enhancedProps = {
		...props,
		setRoute,
		route
	}

	// Only handle errors not handled by other components
	const unknownErrors = props.errors.filter(isUnknownError)

	const hasError = unknownErrors.length !== 0
	const hasToken = props.token.value != null

	if (hasError === true) return h(OverlayFailure, { errors: unknownErrors })
	if (hasToken === false) return h(OverlayLogin, { token: props.token, addToken: props.addToken.bind(null, props) })

	return h(Fragment, {},
		h(Filter, enhancedProps),
		h(Dashboard, enhancedProps)
	)

}

export default withErrorBoundary(Main, {
	FallbackComponent: ErrorFallback
})
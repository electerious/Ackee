import { createElement as h, Fragment } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import useCustomScrollbar from '../hooks/useCustomScrollbar'
import useRouter from '../hooks/useRouter'
import isSignedOutError from '../utils/isSignedOutError'

import OverlayFailure from './overlays/OverlayFailure'
import OverlayLogin from './overlays/OverlayLogin'
import ErrorFallback from './ErrorFallback'
import Filter from './Filter'
import Dashboard from './Dashboard'

const Main = (props) => {

	useCustomScrollbar()
	const [ setRoute, route ] = useRouter()
	const status = props.useStatusLink()

	const fetching = (status.numPendingQueries + status.numPendingMutations) > 0
	const errors = [
		...status.queryError?.graphQLErrors ?? [],
		...status.mutationError?.graphQLErrors ?? []
	]

	const isSignedOut = errors.filter(isSignedOutError).length > 0
	if (isSignedOut === true) return h(OverlayLogin, {
		setToken: props.setToken
	})

	const hasErrors = errors.length > 0
	if (hasErrors === true) return h(OverlayFailure, {
		errors,
		resetToken: props.resetToken
	})

	return h(Fragment, {},
		h(Filter, {
			filter: props.filter,
			route
		}),
		h(Dashboard, {
			...props,
			fetching,
			setRoute,
			route
		})
	)

}

export default withErrorBoundary(Main, {
	FallbackComponent: ErrorFallback
})
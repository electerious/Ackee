import { createElement as h, Fragment } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import OverlayFailure from './overlays/OverlayFailure'
import OverlayLogin from './overlays/OverlayLogin'
import ErrorFallback from './ErrorFallback'
import Filter from './Filter'
import Dashboard from './Dashboard'

const Main = (props) => {

	const requiresLogin = props.authenticated === false
	if (requiresLogin === true) return h(OverlayLogin, {
		setToken: props.setToken
	})

	const hasErrors = props.errors.length > 0
	if (hasErrors === true) return h(OverlayFailure, {
		errors: props.errors,
		resetToken: props.resetToken
	})

	return h(Fragment, {},
		h(Filter, {
			filters: props.filters,
			setSortingFilter: props.setSortingFilter,
			setRangeFilter: props.setRangeFilter,
			setIntervalFilter: props.setIntervalFilter,
			setViewsTypeFilter: props.setViewsTypeFilter,
			setReferrersTypeFilter: props.setReferrersTypeFilter,
			setDevicesTypeFilter: props.setDevicesTypeFilter,
			setBrowsersTypeFilter: props.setBrowsersTypeFilter,
			setSizesTypeFilter: props.setSizesTypeFilter,
			setSystemsTypeFilter: props.setSystemsTypeFilter,
			route: props.route
		}),
		h(Dashboard, {
			...props,
			loading: props.loading,
			setRoute: props.setRoute,
			route: props.route
		})
	)

}

export default withErrorBoundary(Main, {
	FallbackComponent: ErrorFallback
})
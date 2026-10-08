import { Fragment, createElement as h } from 'react'

import useAuthenticated from '../hooks/use-authenticated.js'

import Dashboard from './dashboard.js'
import Filter from './filter.js'
import OverlayFailure from './overlays/overlay-failure.js'
import OverlayLogin from './overlays/overlay-login.js'

const Main = (props) => {
  const errors = props.useErrors()
  const authenticated = useAuthenticated(props.token, errors, props.reset)

  const requiresLogin = authenticated === false
  if (requiresLogin)
    return h(OverlayLogin, {
      setToken: props.setToken,
    })

  const hasErrors = errors.length > 0
  if (hasErrors)
    return h(OverlayFailure, {
      errors,
      reset: props.reset,
    })

  return h(
    Fragment,
    {},
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
      route: props.route,
    }),
    h(Dashboard, props),
  )
}

export default Main

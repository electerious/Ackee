import { useCallback, useReducer } from 'react'

import { version } from '../../../../package.json'
import { BROWSERS_TYPE_WITH_VERSION } from '../../../constants/browsers.js'
import { DEVICES_TYPE_WITH_MODEL } from '../../../constants/devices.js'
import { INTERVALS_DAILY } from '../../../constants/intervals.js'
import { RANGES_LAST_7_DAYS } from '../../../constants/ranges.js'
import { REFERRERS_TYPE_WITH_SOURCE } from '../../../constants/referrers.js'
import { SIZES_TYPE_BROWSER_RESOLUTION } from '../../../constants/sizes.js'
import { SORTINGS_TOP } from '../../../constants/sortings.js'
import { SYSTEMS_TYPE_WITH_VERSION } from '../../../constants/systems.js'
import { VIEWS_TYPE_UNIQUE } from '../../../constants/views.js'

import createStorage from '../utils/create-storage.js'

const SET_FILTER = Symbol()
const RESET_FILTERS = Symbol()

// The key should include the package version so we can increase the version number
// when the structure of the state has changed to avoid loading an outdated state.
const { get, set, reset } = createStorage(`ackee_filter_${version}`, {
  sorting: SORTINGS_TOP,
  range: RANGES_LAST_7_DAYS,
  interval: INTERVALS_DAILY,
  viewsType: VIEWS_TYPE_UNIQUE,
  referrersType: REFERRERS_TYPE_WITH_SOURCE,
  devicesType: DEVICES_TYPE_WITH_MODEL,
  browsersType: BROWSERS_TYPE_WITH_VERSION,
  sizesType: SIZES_TYPE_BROWSER_RESOLUTION,
  systemsType: SYSTEMS_TYPE_WITH_VERSION,
})

const reducer = (state, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return set({
        ...state,
        [action.key]: action.payload,
      })
    }
    case RESET_FILTERS: {
      return reset()
    }
    default: {
      return state
    }
  }
}

export default () => {
  const [filters, dispatch] = useReducer(reducer, get())

  const createSetter = useCallback(
    (key) => (payload) =>
      dispatch({
        type: SET_FILTER,
        key,
        payload,
      }),
    [dispatch],
  )

  const setSortingFilter = useCallback(createSetter('sorting'), [createSetter])
  const setRangeFilter = useCallback(createSetter('range'), [createSetter])
  const setIntervalFilter = useCallback(createSetter('interval'), [createSetter])
  const setViewsTypeFilter = useCallback(createSetter('viewsType'), [createSetter])
  const setReferrersTypeFilter = useCallback(createSetter('referrersType'), [createSetter])
  const setDevicesTypeFilter = useCallback(createSetter('devicesType'), [createSetter])
  const setBrowsersTypeFilter = useCallback(createSetter('browsersType'), [createSetter])
  const setSizesTypeFilter = useCallback(createSetter('sizesType'), [createSetter])
  const setSystemsTypeFilter = useCallback(createSetter('systemsType'), [createSetter])

  const resetFilters = useCallback(
    () =>
      dispatch({
        type: RESET_FILTERS,
      }),
    [dispatch],
  )

  return {
    filters,
    setSortingFilter,
    setRangeFilter,
    setIntervalFilter,
    setViewsTypeFilter,
    setReferrersTypeFilter,
    setDevicesTypeFilter,
    setBrowsersTypeFilter,
    setSizesTypeFilter,
    setSystemsTypeFilter,
    resetFilters,
  }
}

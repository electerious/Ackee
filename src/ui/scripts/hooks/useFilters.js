import { useReducer, useCallback } from 'react'

import { version } from '../../../../package.json'
import { SORTINGS_TOP } from '../../../constants/sortings'
import { RANGES_LAST_7_DAYS } from '../../../constants/ranges'
import { INTERVALS_DAILY } from '../../../constants/intervals'
import { VIEWS_TYPE_UNIQUE } from '../../../constants/views'
import { REFERRERS_TYPE_WITH_SOURCE } from '../../../constants/referrers'
import { DEVICES_TYPE_WITH_MODEL } from '../../../constants/devices'
import { BROWSERS_TYPE_WITH_VERSION } from '../../../constants/browsers'
import { SIZES_TYPE_BROWSER_RESOLUTION } from '../../../constants/sizes'
import { SYSTEMS_TYPE_WITH_VERSION } from '../../../constants/systems'

import createStorage from '../utils/createStorage'

const SET_SORTING_FILTER = Symbol()
const SET_RANGE_FILTER = Symbol()
const SET_INTERVAL_FILTER = Symbol()
const SET_VIEWS_TYPE_FILTER = Symbol()
const SET_REFERRERS_TYPE_FILTER = Symbol()
const SET_DEVICES_TYPE_FILTER = Symbol()
const SET_BROWSERS_TYPE_FILTER = Symbol()
const SET_SIZES_TYPE_FILTER = Symbol()
const SET_SYSTEMS_TYPE_FILTER = Symbol()
const RESET_FILTERS = Symbol()

// The key should include the package version so we can increase the version number
// when the structure of the state has changed to avoid loading an outdated state.
const { get, set, reset } = createStorage(`ackee_filter_${ version }`, {
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
		case SET_SORTING_FILTER:
			return set({
				...state,
				sorting: action.payload,
			})
		case SET_RANGE_FILTER:
			return set({
				...state,
				range: action.payload,
			})
		case SET_INTERVAL_FILTER:
			return set({
				...state,
				interval: action.payload,
			})
		case SET_VIEWS_TYPE_FILTER:
			return set({
				...state,
				viewsType: action.payload,
			})
		case SET_REFERRERS_TYPE_FILTER:
			return set({
				...state,
				referrersType: action.payload,
			})
		case SET_DEVICES_TYPE_FILTER:
			return set({
				...state,
				devicesType: action.payload,
			})
		case SET_BROWSERS_TYPE_FILTER:
			return set({
				...state,
				browsersType: action.payload,
			})
		case SET_SIZES_TYPE_FILTER:
			return set({
				...state,
				sizesType: action.payload,
			})
		case SET_SYSTEMS_TYPE_FILTER:
			return set({
				...state,
				systemsType: action.payload,
			})
		case RESET_FILTERS:
			return reset()
		default:
			return state
	}
}

export default () => {
	const [ filters, dispatch ] = useReducer(reducer, get())

	const setSortingFilter = useCallback((payload) => dispatch({
		type: SET_SORTING_FILTER,
		payload,
	}), [ dispatch ])

	const setRangeFilter = useCallback((payload) => dispatch({
		type: SET_RANGE_FILTER,
		payload,
	}), [ dispatch ])

	const setIntervalFilter = useCallback((payload) => dispatch({
		type: SET_INTERVAL_FILTER,
		payload,
	}), [ dispatch ])

	const setViewsTypeFilter = useCallback((payload) => dispatch({
		type: SET_VIEWS_TYPE_FILTER,
		payload,
	}), [ dispatch ])

	const setReferrersTypeFilter = useCallback((payload) => dispatch({
		type: SET_REFERRERS_TYPE_FILTER,
		payload,
	}), [ dispatch ])

	const setDevicesTypeFilter = useCallback((payload) => dispatch({
		type: SET_DEVICES_TYPE_FILTER,
		payload,
	}), [ dispatch ])

	const setBrowsersTypeFilter = useCallback((payload) => dispatch({
		type: SET_BROWSERS_TYPE_FILTER,
		payload,
	}), [ dispatch ])

	const setSizesTypeFilter = useCallback((payload) => dispatch({
		type: SET_SIZES_TYPE_FILTER,
		payload,
	}), [ dispatch ])

	const setSystemsTypeFilter = useCallback((payload) => dispatch({
		type: SET_SYSTEMS_TYPE_FILTER,
		payload,
	}), [ dispatch ])

	const resetFilters = useCallback(() => dispatch({
		type: RESET_FILTERS,
	}), [ dispatch ])

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
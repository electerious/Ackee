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

// Should include the package version so we can increase the version number
// when the structure of the state has changed to avoid loading outdated state.
const PERSISTED_STATE_KEY = `ackee_filter_${ version }`

const SET_FILTER_SORTING = Symbol()
const SET_FILTER_RANGE = Symbol()
const SET_FILTER_INTERVAL = Symbol()
const SET_FILTER_VIEWS_TYPE = Symbol()
const SET_FILTER_REFERRERS_TYPE = Symbol()
const SET_FILTER_DEVICES_TYPE = Symbol()
const SET_FILTER_BROWSERS_TYPE = Symbol()
const SET_FILTER_SIZES_TYPE = Symbol()
const SET_FILTER_SYSTEMS_TYPE = Symbol()

const initialState = {
	sorting: SORTINGS_TOP,
	range: RANGES_LAST_7_DAYS,
	interval: INTERVALS_DAILY,
	viewsType: VIEWS_TYPE_UNIQUE,
	referrersType: REFERRERS_TYPE_WITH_SOURCE,
	devicesType: DEVICES_TYPE_WITH_MODEL,
	browsersType: BROWSERS_TYPE_WITH_VERSION,
	sizesType: SIZES_TYPE_BROWSER_RESOLUTION,
	systemsType: SYSTEMS_TYPE_WITH_VERSION
}

const get = () => JSON.parse(localStorage.getItem(PERSISTED_STATE_KEY) ?? JSON.stringify(initialState))
// const set = (state) => localStorage.setItem(PERSISTED_STATE_KEY, JSON.stringify(state))
// const reset = () => localStorage.removeItem(PERSISTED_STATE_KEY)

const reducer = (state, action) => {
	switch (action.type) {
		case SET_FILTER_SORTING:
			return {
				...state,
				sorting: action.payload
			}
		case SET_FILTER_RANGE:
			return {
				...state,
				range: action.payload
			}
		case SET_FILTER_INTERVAL:
			return {
				...state,
				interval: action.payload
			}
		case SET_FILTER_VIEWS_TYPE:
			return {
				...state,
				viewsType: action.payload
			}
		case SET_FILTER_REFERRERS_TYPE:
			return {
				...state,
				referrersType: action.payload
			}
		case SET_FILTER_DEVICES_TYPE:
			return {
				...state,
				devicesType: action.payload
			}
		case SET_FILTER_BROWSERS_TYPE:
			return {
				...state,
				browsersType: action.payload
			}
		case SET_FILTER_SIZES_TYPE:
			return {
				...state,
				sizesType: action.payload
			}
		case SET_FILTER_SYSTEMS_TYPE:
			return {
				...state,
				systemsType: action.payload
			}
		default:
			return state
	}

}

export default () => {

	const [ filter, dispatch ] = useReducer(reducer, get())

	const setFilterSorting = useCallback((payload) => dispatch({
		type: SET_FILTER_SORTING,
		payload
	}), [ dispatch ])

	const setFilterRange = useCallback((payload) => dispatch({
		type: SET_FILTER_RANGE,
		payload
	}), [ dispatch ])

	const setFilterInterval = useCallback((payload) => dispatch({
		type: SET_FILTER_INTERVAL,
		payload
	}), [ dispatch ])

	const setFilterViewsType = useCallback((payload) => dispatch({
		type: SET_FILTER_VIEWS_TYPE,
		payload
	}), [ dispatch ])

	const setFilterReferrersType = useCallback((payload) => dispatch({
		type: SET_FILTER_REFERRERS_TYPE,
		payload
	}), [ dispatch ])

	const setFilterDevicesType = useCallback((payload) => dispatch({
		type: SET_FILTER_DEVICES_TYPE,
		payload
	}), [ dispatch ])

	const setFilterBrowsersType = useCallback((payload) => dispatch({
		type: SET_FILTER_BROWSERS_TYPE,
		payload
	}), [ dispatch ])

	const setFilterSizesType = useCallback((payload) => dispatch({
		type: SET_FILTER_SIZES_TYPE,
		payload
	}), [ dispatch ])

	const setFilterSystemsType = useCallback((payload) => dispatch({
		type: SET_FILTER_SYSTEMS_TYPE,
		payload
	}), [ dispatch ])

	return {
		filter,
		setFilterSorting,
		setFilterRange,
		setFilterInterval,
		setFilterViewsType,
		setFilterReferrersType,
		setFilterDevicesType,
		setFilterBrowsersType,
		setFilterSizesType,
		setFilterSystemsType
	}

}
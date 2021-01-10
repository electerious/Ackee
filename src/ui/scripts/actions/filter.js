export const SET_FILTER_SORTING = Symbol()
export const SET_FILTER_RANGE = Symbol()
export const SET_FILTER_INTERVAL = Symbol()
export const SET_FILTER_VIEWS_TYPE = Symbol()
export const SET_FILTER_REFERRERS_TYPE = Symbol()
export const SET_FILTER_DEVICES_TYPE = Symbol()
export const SET_FILTER_BROWSERS_TYPE = Symbol()
export const SET_FILTER_SIZES_TYPE = Symbol()
export const SET_FILTER_SYSTEMS_TYPE = Symbol()

export const setFilterSorting = (payload) => ({
	type: SET_FILTER_SORTING,
	payload
})

export const setFilterRange = (payload) => ({
	type: SET_FILTER_RANGE,
	payload
})

export const setFilterInterval = (payload) => ({
	type: SET_FILTER_INTERVAL,
	payload
})

export const setFilterViewsType = (payload) => ({
	type: SET_FILTER_VIEWS_TYPE,
	payload
})

export const setFilterReferrersType = (payload) => ({
	type: SET_FILTER_REFERRERS_TYPE,
	payload
})

export const setFilterDevicesType = (payload) => ({
	type: SET_FILTER_DEVICES_TYPE,
	payload
})

export const setFilterBrowsersType = (payload) => ({
	type: SET_FILTER_BROWSERS_TYPE,
	payload
})

export const setFilterSizesType = (payload) => ({
	type: SET_FILTER_SIZES_TYPE,
	payload
})

export const setFilterSystemsType = (payload) => ({
	type: SET_FILTER_SYSTEMS_TYPE,
	payload
})
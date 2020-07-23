export const SET_FILTER_SORTING = Symbol()
export const SET_FILTER_RANGE = Symbol()
export const SET_FILTER_INTERVAL = Symbol()

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
export const SET_FILTER_RANGE = Symbol()
export const SET_FILTER_INTERVAL = Symbol()

export const setFilterRange = (payload) => ({
	type: SET_FILTER_RANGE,
	payload
})

export const setFilterInterval = (payload) => ({
	type: SET_FILTER_INTERVAL,
	payload
})
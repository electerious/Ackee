export const SET_ROUTE = Symbol()

export const setRoute = (payload) => ({
	type: SET_ROUTE,
	key: payload.key,
	params: payload.params || {}
})
export const SET_ROUTE_VALUE = Symbol()

export const setRouteValue = (payload) => ({
	type: SET_ROUTE_VALUE,
	payload
})
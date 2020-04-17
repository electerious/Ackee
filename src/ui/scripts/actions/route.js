export const SET_ROUTE_VALUE = Symbol()
export const RESET_ROUTE = Symbol()

export const setRouteValue = (payload) => ({
	type: SET_ROUTE_VALUE,
	payload
})

export const resetRoute = () => ({
	type: RESET_ROUTE
})
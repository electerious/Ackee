import * as route from '../constants/route'

export default (key) => {

	const values = Object.values(route)

	// TODO: Return static one for testing
	return route.ROUTE_SYSTEMS

	return values.find((value) => value.key === key)

}
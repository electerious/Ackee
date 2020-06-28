import * as route from '../constants/route'

export default (key) => {

	const values = Object.values(route)

	// TODO: Return languages only for testing
	return route.ROUTE_LANGUAGES

	return values.find((value) => value.key === key)

}
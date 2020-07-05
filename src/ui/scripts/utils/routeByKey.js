import * as route from '../constants/route'

export default (key) => {

	const values = Object.values(route)

	return values.find((value) => value.key === key)

}
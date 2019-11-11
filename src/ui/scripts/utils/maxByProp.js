export default (prop) => (acc, obj) => {

	const value = obj[prop]

	if (value > acc) return value
	else return acc

}
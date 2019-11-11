import sAgo from 's-ago'

export default (date) => {

	const value = sAgo(date)

	// Uppercase first character
	return value.charAt(0).toUpperCase() + value.slice(1)

}
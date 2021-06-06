import isAuthenticationError from '../utils/isAuthenticationError'

export default (token, errors, reset) => {
	const hasToken = token != null
	if (hasToken === false) return false

	const hasAuthenticationError = errors.filter(isAuthenticationError).length > 0
	if (hasAuthenticationError === true) {
		reset()
		return false
	}

	return true
}
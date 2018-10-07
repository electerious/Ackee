// These errors are handled by the UI and aren't critical
const knownErrors = [
	'Token invalid',
	'Username or password incorrect'
]

export default (err) => knownErrors.includes(err.message) === false
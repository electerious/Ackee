// These errors are indicating that the user is signed out
const signedOutErrors = [
	'Token invalid',
	'Token missing',
	'Username or password incorrect'
]

export default (err) => signedOutErrors.includes(err.message) === true
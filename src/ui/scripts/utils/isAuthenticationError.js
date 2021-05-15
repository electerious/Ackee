const authenticationErrors = [
	'Token invalid',
	'Token missing',
	'Username or password incorrect'
]

export default (err) => authenticationErrors.includes(err.message) === true
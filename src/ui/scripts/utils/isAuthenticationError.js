const authenticationErrors = [
	'Token invalid',
	'Token missing',
	'Username or password incorrect',
]

export default (error) => authenticationErrors.includes(error.message) === true
const authenticationErrors = new Set(['Token invalid', 'Token missing', 'Username or password incorrect'])

export default (error) => authenticationErrors.has(error.message) === true

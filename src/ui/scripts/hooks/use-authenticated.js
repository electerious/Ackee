import isAuthenticationError from '../utils/is-authentication-error.js'

export default (token, errors, reset) => {
  const hasToken = token != null
  if (!hasToken) return false

  const hasAuthenticationError = errors.some(isAuthenticationError)
  if (hasAuthenticationError === true) {
    reset()
    return false
  }

  return true
}

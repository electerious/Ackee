import KnownError from '../utils/known-error.js'

export default (parent, args, { isDemoMode }) => {
  if (isDemoMode === true) {
    throw new KnownError('Forbidden in demo mode')
  }
}

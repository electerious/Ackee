import KnownError from '../utils/KnownError.js'

export default (parent, args, { viewer }) => {
  if (viewer instanceof KnownError) throw viewer
}

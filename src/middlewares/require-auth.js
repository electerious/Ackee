export default (parent, args, { isAuthenticated }) => {
  if (isAuthenticated !== true) {
    throw isAuthenticated
  }
}

'use strict'

module.exports = (connectionUri) => {
  if (typeof connectionUri === 'string' &&
    connectionUri.indexOf('@') > -1 &&
    connectionUri.indexOf('://') > -1) {
    const atIndex = connectionUri.indexOf('@')
    const protocolIndex = connectionUri.indexOf('://')
    return connectionUri.slice(0, protocolIndex + 3) + connectionUri.slice(atIndex + 1)
  } else {
    return connectionUri
  }
}

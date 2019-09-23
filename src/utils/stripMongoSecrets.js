'use strict'

module.exports = (connectionUri) => {
  if (connectionUri.indexOf('@') > -1 && connectionUri.indexOf('mongodb://' === 0)) {
    const atIndex = connectionUri.indexOf('@')
    return 'mongodb://' + connectionUri.slice(atIndex + 1)
  } else {
    return connectionUri
  }
}

'use strict'

const name = process.env.ACKEE_TRACKER
const exists = name != null && name !== ''

module.exports = exists === true ? `/${ encodeURIComponent(name) }.js` : undefined
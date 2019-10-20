'use strict'

const name = process.env.ACKEE_TRACKER

module.exports = name != null ? `/${ encodeURIComponent(name) }.js` : undefined
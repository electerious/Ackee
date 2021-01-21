'use strict'

const sanitizeFilename = require('sanitize-filename')

const name = process.env.ACKEE_TRACKER
const exists = name != null && name !== ''

module.exports = {
	exists,
	url: exists === true ? `/${ encodeURIComponent(name) }.js` : undefined,
	path: exists === true ? `${ sanitizeFilename(name) }.js` : undefined
}
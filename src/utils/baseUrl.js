'use strict'

const sanitizeFilename = require('sanitize-filename')

const name = process.env.ACKEE_BASEURL
const exists = name != null && name !== ''

module.exports = {
	exists,
	url: exists === true ? `${ encodeURIComponent(name) }` : '',
	path: exists === true ? `${ sanitizeFilename(name) }` : '',
}

console.log(module.exports.path)
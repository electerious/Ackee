'use strict'

const crypto = require('crypto')

const salt = require('./salt')

module.exports = (ip, userAgent, domainId) => {

	return crypto.createHash('sha256').update(`${ salt() }${ ip }${ userAgent }${ domainId }`).digest('hex')

}
'use strict'

const crypto = require('crypto')
const { getClientIp } = require('request-ip')

const salt = require('./salt')

module.exports = (req) => {

	const ip = getClientIp(req)
	const userAgent = req.headers['user-agent']

	return crypto.createHash('sha256').update(`${ salt() }${ ip }${ userAgent }`).digest('hex')

}
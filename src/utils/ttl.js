'use strict'

const day = require('./day')

module.exports = (timestamp, ttl = day) => {

	const current = Date.now()
	const passed = current - timestamp

	return ttl > passed

}
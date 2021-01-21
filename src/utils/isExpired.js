'use strict'

module.exports = (timestamp, ttl) => {

	const current = Date.now()
	const passed = current - timestamp

	return ttl < passed

}
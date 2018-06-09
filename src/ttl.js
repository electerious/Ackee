'use strict'

module.exports = (updated) => {

	const second = 1000
	const hour = second * 60
	const day = hour * 60

	const current = Date.now()
	const passed = current - updated

	const ttl = process.env.TTL || day

	return ttl >= passed

}
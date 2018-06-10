'use strict'

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

module.exports = (timestamp, ttl = day) => {

	const current = Date.now()
	const passed = current - timestamp

	return ttl > passed

}
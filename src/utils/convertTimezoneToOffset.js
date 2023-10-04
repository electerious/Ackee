'use strict'

const { getTimezoneOffset, format } = require('date-fns-tz')

const formatMsToOffset = (ms) => {
	const isPositive = ms >= 0
	const formatted = format(ms, 'hh:mm')
	return `${ isPositive ? '+' : '-' }${ formatted }`
}

module.exports = (timezone) => {
	const offset = getTimezoneOffset(timezone)
	return offset ? formatMsToOffset(offset) : '+00:00'
}
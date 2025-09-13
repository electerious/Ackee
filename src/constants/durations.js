'use strict'

const { customise } = require('../utils/constants')
const { hour, second } = require('../utils/times')

const DURATIONS_INTERVAL = 15 * second
const DURATIONS_LIMIT = hour / 2

module.exports = customise({
	DURATIONS_INTERVAL,
	DURATIONS_LIMIT,
}, [
	'DURATIONS_INTERVAL',
	'DURATIONS_LIMIT',
])
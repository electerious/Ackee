'use strict'

const { hour } = require('../utils/times')

const DURATIONS_INTERVAL = 15_000
const DURATIONS_LIMIT = hour / 2

module.exports = {
	DURATIONS_INTERVAL,
	DURATIONS_LIMIT,
}
'use strict'

const { subDays } = require('date-fns')

const zeroDate = require('./zeroDate')
const ranges = require('../constants/ranges')

module.exports = (range) => {

	switch (range) {
		case ranges.RANGES_LAST_24_HOURS:
			return subDays(zeroDate(), 1)
		case ranges.RANGES_LAST_7_DAYS:
			return subDays(zeroDate(), 6)
		case ranges.RANGES_LAST_30_DAYS:
			return subDays(zeroDate(), 29)
		default:
			return null
	}

}
'use strict'

const { startOfDay, subDays } = require('date-fns')

const ranges = require('../constants/ranges')

module.exports = (range) => {

	switch (range) {
		case ranges.RANGES_LAST_24_HOURS:
			return subDays(startOfDay(new Date()), 1)
		case ranges.RANGES_LAST_7_DAYS:
			return subDays(startOfDay(new Date()), 6)
		case ranges.RANGES_LAST_30_DAYS:
			return subDays(startOfDay(new Date()), 29)
		default:
			return null
	}

}
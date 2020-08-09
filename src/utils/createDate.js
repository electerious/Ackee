'use strict'

const { subMilliseconds, subHours, subDays, subMonths, subYears, startOfHour, startOfDay, startOfMonth, startOfYear } = require('date-fns')
const serverTimeZone = require('./timeZone')

module.exports = (userTimeZone = serverTimeZone) => {

	const currentDate = new Date()

	return {
		userTimeZone,
		// Get a date with an offset
		lastMilliseconds: (milliseconds) => subMilliseconds(currentDate, milliseconds),
		lastHours: (hours) => subHours(currentDate, hours),
		lastDays: (days) => subDays(currentDate, days),
		lastMonths: (months) => subMonths(currentDate, months),
		lastYears: (years) => subYears(currentDate, years),
		// Get a date with an offset that always includes the whole unit of the given interval
		includeHours: (hours) => subHours(startOfHour(currentDate), hours - 1),
		includeDays: (days) => subDays(startOfDay(currentDate), days - 1),
		includeMonths: (months) => subMonths(startOfMonth(currentDate), months - 1),
		includeYears: (years) => subYears(startOfYear(currentDate), years - 1)
	}

}
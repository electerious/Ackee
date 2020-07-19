'use strict'

const { utcToZonedTime } = require('date-fns-tz')
const { subHours, subDays, subMonths, subYears, startOfHour, startOfDay, startOfMonth, startOfYear } = require('date-fns')
const serverTimeZone = require('./timeZone')

module.exports = (date, timeZone = serverTimeZone) => {

	const zonedDate = utcToZonedTime(date, timeZone)

	return {
		zonedDate,
		timeZone,
		// Get a date with an offset
		lastHours: (hours) => subHours(zonedDate, hours),
		lastDays: (days) => subDays(zonedDate, days),
		lastMonths: (months) => subMonths(zonedDate, months),
		lastYears: (years) => subYears(zonedDate, years),
		// Get a date with an offset that always includes the whole unit of the given interval
		includeHours: (hours) => subHours(startOfHour(zonedDate), hours - 1),
		includeDays: (days) => subDays(startOfDay(zonedDate), days - 1),
		includeMonths: (months) => subMonths(startOfMonth(zonedDate), months - 1),
		includeYears: (years) => subYears(startOfYear(zonedDate), years - 1)
	}

}
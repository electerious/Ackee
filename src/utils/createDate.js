'use strict'

const { utcToZonedTime, zonedTimeToUtc } = require('date-fns-tz')
const { subMilliseconds, subHours, subDays, subMonths, subYears, startOfHour, startOfDay, startOfMonth, startOfYear } = require('date-fns')
const serverTimeZone = require('./timeZone')

module.exports = (userTimeZone = serverTimeZone, customServerZonedDate = new Date()) => {

	// There're three kinds of dates:
	// 1. Server zoned date = Dates created on the server contain the server time zone offset
	// Dates returned by MongoDB are also server zoned dates because MongoDB converts the UTC
	// dates from the database back to server zoned dates.
	const serverZonedDate = customServerZonedDate
	// 2. UTC date = Date without time zone offset
	const utcDate = zonedTimeToUtc(serverZonedDate, serverTimeZone)
	// 3. User zoned date = The UTC date with the time zone offset of the user
	const userZonedDate = utcToZonedTime(utcDate, userTimeZone)

	// Most operations are based on the server zoned date because MongoDB works with UTC
	// and removes the server offset before writing dates to the database. Same applies
	// when getting data via aggregations. It would be wrong to use a user zoned date,
	// because MongoDB would try to remove the server time zone offset from it instead
	// of the user time zone offset it contains.

	return {
		userZonedDate,
		userTimeZone,
		// Get a date with an offset
		lastMilliseconds: (milliseconds) => subMilliseconds(serverZonedDate, milliseconds),
		lastHours: (hours) => subHours(serverZonedDate, hours),
		lastDays: (days) => subDays(serverZonedDate, days),
		lastMonths: (months) => subMonths(serverZonedDate, months),
		lastYears: (years) => subYears(serverZonedDate, years),
		// Get a date with an offset that always includes the whole unit of the given interval
		includeHours: (hours) => subHours(startOfHour(serverZonedDate), hours - 1),
		includeDays: (days) => subDays(startOfDay(serverZonedDate), days - 1),
		includeMonths: (months) => subMonths(startOfMonth(serverZonedDate), months - 1),
		includeYears: (years) => subYears(startOfYear(serverZonedDate), years - 1)
	}

}
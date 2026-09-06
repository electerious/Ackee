import {
  startOfDay,
  startOfMonth,
  startOfYear,
  subDays,
  subHours,
  subMilliseconds,
  subMonths,
  subYears,
} from 'date-fns'
import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../constants/intervals.js'
import serverTimeZone from './timeZone.js'

// Validate the timezone string against the Intl API. Falls back to the
// server timezone when the client-supplied value is absent or invalid,
// preventing a RangeError from propagating through the request.
const sanitizeTimeZone = (tz) => {
  if (tz == null) return serverTimeZone
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz })
    return tz
  } catch {
    return serverTimeZone
  }
}

export default (userTimeZone) => {
  const safeTimeZone = sanitizeTimeZone(userTimeZone)
  const currentDate = new Date()

  // This is the biggest, positive timezone offset possible (starting from UTC).
  // We should always additionally include this amount of hours when selecting data,
  // when data is grouped by day, month or year. This ensures that we don't exclude
  // relevant data. E.g. if you're GMT+2 and we only include the data of the current
  // day, than we will miss 2 hours of data. This is also the case in the other
  // direction. GMT-2 will include 2 hours more data, but that's not a problem,
  // because the data will be removed from the output when enhancing the data.
  // We could also use the real offset of userTimeZone, but that would only make
  // things more complicated. The max offset does the job.
  const timeZoneToleranz = 14

  const instance = {
    userTimeZone: safeTimeZone,
    // Get a date with an offset
    lastMilliseconds: (milliseconds) => subMilliseconds(currentDate, milliseconds),
    lastHours: (hours) => subHours(currentDate, hours),
    lastDays: (days) => subDays(currentDate, days),
    lastMonths: (months) => subMonths(currentDate, months),
    lastYears: (years) => subYears(currentDate, years),
    // Get a date with an offset that always includes the whole unit of the given interval and a timezone toleranz
    includeDays: (days) => subHours(subDays(startOfDay(currentDate), days - 1), timeZoneToleranz),
    includeMonths: (months) => subHours(subMonths(startOfMonth(currentDate), months - 1), timeZoneToleranz),
    includeYears: (years) => subHours(subYears(startOfYear(currentDate), years - 1), timeZoneToleranz),
  }

  // Get the last-function that matches the interval
  const lastFnByInterval = (interval) => {
    switch (interval) {
      case INTERVALS_DAILY: {
        return instance.lastDays
      }
      case INTERVALS_MONTHLY: {
        return instance.lastMonths
      }
      case INTERVALS_YEARLY: {
        return instance.lastYears
      }
      default: {
        throw new Error(`Unknown interval '${interval}'`)
      }
    }
  }

  // Get the include-function that matches the interval
  const includeFnByInterval = (interval) => {
    switch (interval) {
      case INTERVALS_DAILY: {
        return instance.includeDays
      }
      case INTERVALS_MONTHLY: {
        return instance.includeMonths
      }
      case INTERVALS_YEARLY: {
        return instance.includeYears
      }
      default: {
        throw new Error(`Unknown interval '${interval}'`)
      }
    }
  }

  return {
    ...instance,
    lastFnByInterval,
    includeFnByInterval,
  }
}

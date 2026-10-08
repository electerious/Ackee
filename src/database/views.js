import { toZonedTime } from 'date-fns-tz'

import aggregateViews from '../aggregations/aggregate-views.js'
import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../constants/intervals.js'
import { VIEWS_TYPE_TOTAL, VIEWS_TYPE_UNIQUE } from '../constants/views.js'
import Record from '../models/record.js'
import createArray from '../utils/create-array.js'
import matchesDate from '../utils/matches-date.js'
import recursiveId from '../utils/recursive-id.js'

const get = async (ids, type, interval, limit, dateDetails) => {
  const aggregation = (() => {
    if (type === VIEWS_TYPE_UNIQUE) return aggregateViews(ids, true, interval, limit, dateDetails)
    if (type === VIEWS_TYPE_TOTAL) return aggregateViews(ids, false, interval, limit, dateDetails)
  })()

  const enhance = (entries) => {
    const matchDay = [INTERVALS_DAILY].includes(interval)
    const matchMonth = [INTERVALS_DAILY, INTERVALS_MONTHLY].includes(interval)
    const matchYear = [INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY].includes(interval)

    return createArray(limit).map((_, index) => {
      const date = dateDetails.lastFnByInterval(interval)(index)

      // Database entries include the day, month and year in the
      // timezone of the user. We therefore need to match it against a
      // date in the timezone of the user.
      const userZonedDate = toZonedTime(date, dateDetails.userTimeZone)

      // Find a entry that matches the date
      const entry = entries.find((entry) => {
        return matchesDate(
          matchDay === true ? entry._id.day : undefined,
          matchMonth === true ? entry._id.month : undefined,
          matchYear === true ? entry._id.year : undefined,
          userZonedDate,
        )
      })

      const value = (() => {
        if (matchDay === true) return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        if (matchMonth === true) return `${date.getFullYear()}-${date.getMonth() + 1}`
        if (matchYear === true) return `${date.getFullYear()}`
      })()

      return {
        id: recursiveId([value, ...ids]),
        value,
        count: entry == null ? 0 : entry.count,
      }
    })
  }

  return enhance(await Record.aggregate(aggregation))
}

export default get

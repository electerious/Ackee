import { toZonedTime } from 'date-fns-tz'

import aggregateActions from '../aggregations/aggregateActions.js'
import aggregateNewActions from '../aggregations/aggregateNewActions.js'
import aggregateRecentActions from '../aggregations/aggregateRecentActions.js'
import aggregateTopActions from '../aggregations/aggregateTopActions.js'
import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../constants/intervals.js'
import { SORTINGS_NEW, SORTINGS_RECENT, SORTINGS_TOP } from '../constants/sortings.js'
import Action from '../models/Action.js'
import createArray from '../utils/createArray.js'
import matchesDate from '../utils/matchesDate.js'
import recursiveId from '../utils/recursiveId.js'

const response = (entry) => ({
  id: entry.id,
  key: entry.key,
  value: entry.value,
  details: entry.details,
  created: entry.created,
  updated: entry.updated,
})

export const add = async (data) => {
  const enhance = (entry) => {
    return entry == null ? entry : response(entry)
  }

  return enhance(await Action.create(data))
}

export const update = async (id, data) => {
  const enhance = (entry) => {
    return entry == null ? entry : response(entry)
  }

  return enhance(
    await Action.findOneAndUpdate(
      {
        id,
      },
      {
        $set: {
          key: data.key,
          value: data.value,
          details: data.details,
          updated: Date.now(),
        },
      },
      {
        returnDocument: 'after',
        runValidators: true,
      },
    ),
  )
}

export const getChart = async (ids, type, interval, limit, dateDetails) => {
  const aggregation = (() => {
    if (type === 'TOTAL') return aggregateActions(ids, false, interval, limit, dateDetails)
    if (type === 'AVERAGE') return aggregateActions(ids, true, interval, limit, dateDetails)
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

  return enhance(await Action.aggregate(aggregation))
}

export const getList = async (ids, sorting, type, range, limit, dateDetails) => {
  const aggregation = (() => {
    if (type === 'TOTAL') {
      if (sorting === SORTINGS_TOP) return aggregateTopActions(ids, false, range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewActions(ids, limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentActions(ids, limit)
    }
    if (type === 'AVERAGE') {
      if (sorting === SORTINGS_TOP) return aggregateTopActions(ids, true, range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewActions(ids, limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentActions(ids, limit)
    }
  })()

  const enhanceId = (id) => {
    return id.key
  }

  const enhance = (entries) => {
    return entries.map((entry) => {
      const value = enhanceId(entry._id)

      return {
        id: recursiveId([value, sorting, type, range, ...ids]),
        value,
        count: entry.count,
        created: entry.created,
      }
    })
  }

  return enhance(await Action.aggregate(aggregation))
}

export const del = (eventId) => {
  return Action.deleteMany({
    eventId,
  })
}

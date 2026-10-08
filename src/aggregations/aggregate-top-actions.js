import {
  RANGES_LAST_24_HOURS,
  RANGES_LAST_30_DAYS,
  RANGES_LAST_6_MONTHS,
  RANGES_LAST_7_DAYS,
} from '../constants/ranges.js'
import matchEvents from '../stages/match-events.js'

export default (ids, average, range, limit, dateDetails) => {
  const aggregation = [
    matchEvents(ids),
    {
      $group: {
        _id: {
          key: '$key',
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: limit,
    },
  ]

  aggregation[0].$match.key = { $ne: null }
  aggregation[1].$group.count = average === true ? { $avg: '$value' } : { $sum: '$value' }

  if (range === RANGES_LAST_24_HOURS) {
    aggregation[0].$match.created = { $gte: dateDetails.lastHours(24) }
  }

  if (range === RANGES_LAST_7_DAYS) {
    aggregation[0].$match.created = { $gte: dateDetails.lastDays(7) }
  }

  if (range === RANGES_LAST_30_DAYS) {
    aggregation[0].$match.created = { $gte: dateDetails.lastDays(30) }
  }

  if (range === RANGES_LAST_6_MONTHS) {
    aggregation[0].$match.created = { $gte: dateDetails.lastMonths(6) }
  }

  return aggregation
}

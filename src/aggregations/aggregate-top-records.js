import {
  RANGES_LAST_24_HOURS,
  RANGES_LAST_30_DAYS,
  RANGES_LAST_6_MONTHS,
  RANGES_LAST_7_DAYS,
} from '../constants/ranges.js'
import matchDomains from '../stages/match-domains.js'

export default (ids, properties, range, limit, dateDetails, or) => {
  const aggregation = [
    matchDomains(ids),
    {
      $group: {
        _id: {},
        count: {
          $sum: 1,
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

  for (const property of properties) {
    if (or === true) {
      aggregation[0].$match['$or'] = [...(aggregation[0].$match['$or'] || []), { [property]: { $ne: null } }]
    } else {
      aggregation[0].$match[property] = { $ne: null }
    }
    aggregation[1].$group._id[property] = `$${property}`
  }

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

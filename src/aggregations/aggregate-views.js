import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../constants/intervals.js'
import matchDomains from '../stages/match-domains.js'

export default (ids, unique, interval, limit, dateDetails) => {
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
  ]

  if (unique === true)
    aggregation[0].$match.clientId = {
      $exists: true,
      $ne: null,
    }

  aggregation[0].$match.created = { $gte: dateDetails.includeFnByInterval(interval)(limit) }

  const dateExpression = { date: '$created', timezone: dateDetails.userTimeZone }
  const matchDay = [INTERVALS_DAILY].includes(interval)
  const matchMonth = [INTERVALS_DAILY, INTERVALS_MONTHLY].includes(interval)
  const matchYear = [INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY].includes(interval)

  if (matchDay === true) aggregation[1].$group._id.day = { $dayOfMonth: dateExpression }
  if (matchMonth === true) aggregation[1].$group._id.month = { $month: dateExpression }
  if (matchYear === true) aggregation[1].$group._id.year = { $year: dateExpression }

  return aggregation
}

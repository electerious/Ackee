import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../constants/intervals.js'
import matchEvents from '../stages/match-events.js'

export default (ids, average, interval, limit, dateDetails) => {
  const aggregation = [
    matchEvents(ids),
    {
      $group: {
        _id: {},
      },
    },
  ]

  aggregation[0].$match.created = { $gte: dateDetails.includeFnByInterval(interval)(limit) }
  aggregation[1].$group.count = average === true ? { $avg: '$value' } : { $sum: '$value' }

  const dateExpression = { date: '$created', timezone: dateDetails.userTimeZone }
  const matchDay = [INTERVALS_DAILY].includes(interval)
  const matchMonth = [INTERVALS_DAILY, INTERVALS_MONTHLY].includes(interval)
  const matchYear = [INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY].includes(interval)

  if (matchDay === true) aggregation[1].$group._id.day = { $dayOfMonth: dateExpression }
  if (matchMonth === true) aggregation[1].$group._id.month = { $month: dateExpression }
  if (matchYear === true) aggregation[1].$group._id.year = { $year: dateExpression }

  return aggregation
}

import { INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY } from '../constants/intervals.js'
import matchDomains from '../stages/match-domains.js'
import matchLimit from '../stages/match-limit.js'
import projectDuration from '../stages/project-duration.js'
import projectMinInterval from '../stages/project-min-interval.js'

export default (ids, interval, limit, dateDetails) => {
  const aggregation = [
    matchDomains(ids),
    projectDuration(),
    projectMinInterval(),
    matchLimit(),
    {
      $group: {
        _id: {},
        count: {
          $avg: '$duration',
        },
      },
    },
  ]

  aggregation[0].$match.created = { $gte: dateDetails.includeFnByInterval(interval)(limit) }

  const dateExpression = { date: '$created', timezone: dateDetails.userTimeZone }
  const matchDay = [INTERVALS_DAILY].includes(interval)
  const matchMonth = [INTERVALS_DAILY, INTERVALS_MONTHLY].includes(interval)
  const matchYear = [INTERVALS_DAILY, INTERVALS_MONTHLY, INTERVALS_YEARLY].includes(interval)

  if (matchDay) aggregation[4].$group._id.day = { $dayOfMonth: dateExpression }
  if (matchMonth) aggregation[4].$group._id.month = { $month: dateExpression }
  if (matchYear) aggregation[4].$group._id.year = { $year: dateExpression }

  return aggregation
}

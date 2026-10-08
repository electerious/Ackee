import { DURATIONS_INTERVAL, DURATIONS_LIMIT } from '../constants/durations.js'
import matchDomains from '../stages/match-domains.js'

export default (ids, dateDetails) => {
  const aggregation = [
    matchDomains(ids),
    {
      $count: 'count',
    },
  ]

  // A user that navigates between pages will increase the counter temporary.
  // It's therefore importend to count unique views only.
  aggregation[0].$match.clientId = {
    $exists: true,
    $ne: null,
  }

  // Ignore users that are on the page for too long
  aggregation[0].$match.created = { $gte: dateDetails.lastMilliseconds(DURATIONS_LIMIT) }

  // Ignore users that aren't active anymore
  aggregation[0].$match.updated = { $gte: dateDetails.lastMilliseconds(DURATIONS_INTERVAL * 2) }

  return aggregation
}

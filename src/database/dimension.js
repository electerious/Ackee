import aggregateNewRecords from '../aggregations/aggregateNewRecords.js'
import aggregateRecentRecords from '../aggregations/aggregateRecentRecords.js'
import aggregateTopRecords from '../aggregations/aggregateTopRecords.js'
import { SORTINGS_NEW, SORTINGS_RECENT, SORTINGS_TOP } from '../constants/sortings.js'
import Record from '../models/Record.js'
import recursiveId from '../utils/recursiveId.js'

/*
 * Builds the query for one dimension of the statistics, like browsers or sizes.
 * Every type of the dimension says which record fields it groups by and how a group
 * is shown. `or` groups records that have any of the fields instead of all of them.
 */
export default (types) => async (ids, sorting, type, range, limit, dateDetails) => {
  const { fields, format, or } = types[type]

  const aggregation = (() => {
    if (sorting === SORTINGS_TOP) return aggregateTopRecords(ids, fields, range, limit, dateDetails, or)
    if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, fields, limit, or)
    if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, fields, limit, or)
  })()

  const entries = await Record.aggregate(aggregation)

  return entries.map((entry) => {
    const value = format(entry._id)

    return {
      id: recursiveId([value, sorting, type, range, ...ids]),
      value,
      count: entry.count,
      created: entry.created,
    }
  })
}

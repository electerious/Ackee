import aggregateNewRecords from '../aggregations/aggregate-new-records.js'
import aggregateRecentRecords from '../aggregations/aggregate-recent-records.js'
import aggregateTopRecords from '../aggregations/aggregate-top-records.js'
import {
  REFERRERS_TYPE_NO_SOURCE,
  REFERRERS_TYPE_ONLY_SOURCE,
  REFERRERS_TYPE_WITH_SOURCE,
} from '../constants/referrers.js'
import { SORTINGS_NEW, SORTINGS_RECENT, SORTINGS_TOP } from '../constants/sortings.js'
import Record from '../models/record.js'
import recursiveId from '../utils/recursive-id.js'

const get = async (ids, sorting, type, range, limit, dateDetails) => {
  const aggregation = (() => {
    if (type === REFERRERS_TYPE_WITH_SOURCE) {
      if (sorting === SORTINGS_TOP)
        return aggregateTopRecords(ids, ['source', 'siteReferrer'], range, limit, dateDetails, true)
      if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['source', 'siteReferrer'], limit, true)
      if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['source', 'siteReferrer'], limit, true)
    }
    if (type === REFERRERS_TYPE_NO_SOURCE) {
      if (sorting === SORTINGS_TOP) return aggregateTopRecords(ids, ['siteReferrer'], range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['siteReferrer'], limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['siteReferrer'], limit)
    }
    if (type === REFERRERS_TYPE_ONLY_SOURCE) {
      if (sorting === SORTINGS_TOP) return aggregateTopRecords(ids, ['source'], range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['source'], limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['source'], limit)
    }
  })()

  const enhanceId = (id) => {
    return id.source || id.siteReferrer
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

  return enhance(await Record.aggregate(aggregation))
}

export default get

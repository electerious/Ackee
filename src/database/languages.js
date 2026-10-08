import aggregateNewRecords from '../aggregations/aggregate-new-records.js'
import aggregateRecentRecords from '../aggregations/aggregate-recent-records.js'
import aggregateTopRecords from '../aggregations/aggregate-top-records.js'
import { SORTINGS_NEW, SORTINGS_RECENT, SORTINGS_TOP } from '../constants/sortings.js'
import Record from '../models/record.js'
import languageCodes from '../utils/language-codes.js'
import recursiveId from '../utils/recursive-id.js'

const get = async (ids, sorting, range, limit, dateDetails) => {
  const aggregation = (() => {
    if (sorting === SORTINGS_TOP) return aggregateTopRecords(ids, ['siteLanguage'], range, limit, dateDetails)
    if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['siteLanguage'], limit)
    if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['siteLanguage'], limit)
  })()

  const enhanceId = (id) => {
    return languageCodes[id.siteLanguage] || id.siteLanguage
  }

  const enhance = (entries) => {
    return entries.map((entry) => {
      const value = enhanceId(entry._id)

      return {
        id: recursiveId([value, sorting, range, ...ids]),
        value,
        count: entry.count,
        created: entry.created,
      }
    })
  }

  return enhance(await Record.aggregate(aggregation))
}

export default get

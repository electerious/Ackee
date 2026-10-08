import aggregateNewRecords from '../aggregations/aggregate-new-records.js'
import aggregateRecentRecords from '../aggregations/aggregate-recent-records.js'
import aggregateTopRecords from '../aggregations/aggregate-top-records.js'
import { BROWSERS_TYPE_NO_VERSION, BROWSERS_TYPE_WITH_VERSION } from '../constants/browsers.js'
import { SORTINGS_NEW, SORTINGS_RECENT, SORTINGS_TOP } from '../constants/sortings.js'
import Record from '../models/record.js'
import recursiveId from '../utils/recursive-id.js'

const get = async (ids, sorting, type, range, limit, dateDetails) => {
  const aggregation = (() => {
    if (type === BROWSERS_TYPE_NO_VERSION) {
      if (sorting === SORTINGS_TOP) return aggregateTopRecords(ids, ['browserName'], range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['browserName'], limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['browserName'], limit)
    }
    if (type === BROWSERS_TYPE_WITH_VERSION) {
      if (sorting === SORTINGS_TOP)
        return aggregateTopRecords(ids, ['browserName', 'browserVersion'], range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['browserName', 'browserVersion'], limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['browserName', 'browserVersion'], limit)
    }
  })()

  const enhanceId = (id) => {
    if (type === BROWSERS_TYPE_NO_VERSION) return String(id.browserName)
    if (type === BROWSERS_TYPE_WITH_VERSION) return `${id.browserName} ${id.browserVersion}`
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

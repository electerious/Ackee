import aggregateNewRecords from '../aggregations/aggregate-new-records.js'
import aggregateRecentRecords from '../aggregations/aggregate-recent-records.js'
import aggregateTopRecords from '../aggregations/aggregate-top-records.js'
import { SORTINGS_NEW, SORTINGS_RECENT, SORTINGS_TOP } from '../constants/sortings.js'
import { SYSTEMS_TYPE_NO_VERSION, SYSTEMS_TYPE_WITH_VERSION } from '../constants/systems.js'
import Record from '../models/record.js'
import recursiveId from '../utils/recursive-id.js'

const get = async (ids, sorting, type, range, limit, dateDetails) => {
  const aggregation = (() => {
    if (type === SYSTEMS_TYPE_NO_VERSION) {
      if (sorting === SORTINGS_TOP) return aggregateTopRecords(ids, ['osName'], range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['osName'], limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['osName'], limit)
    }
    if (type === SYSTEMS_TYPE_WITH_VERSION) {
      if (sorting === SORTINGS_TOP) return aggregateTopRecords(ids, ['osName', 'osVersion'], range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['osName', 'osVersion'], limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['osName', 'osVersion'], limit)
    }
  })()

  const enhanceId = (id) => {
    if (type === SYSTEMS_TYPE_NO_VERSION) return `${id.osName}`
    if (type === SYSTEMS_TYPE_WITH_VERSION) return `${id.osName} ${id.osVersion}`
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

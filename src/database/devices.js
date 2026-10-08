import aggregateNewRecords from '../aggregations/aggregate-new-records.js'
import aggregateRecentRecords from '../aggregations/aggregate-recent-records.js'
import aggregateTopRecords from '../aggregations/aggregate-top-records.js'
import { DEVICES_TYPE_NO_MODEL, DEVICES_TYPE_WITH_MODEL } from '../constants/devices.js'
import { SORTINGS_NEW, SORTINGS_RECENT, SORTINGS_TOP } from '../constants/sortings.js'
import Record from '../models/record.js'
import recursiveId from '../utils/recursive-id.js'

const get = async (ids, sorting, type, range, limit, dateDetails) => {
  const aggregation = (() => {
    if (type === DEVICES_TYPE_NO_MODEL) {
      if (sorting === SORTINGS_TOP) return aggregateTopRecords(ids, ['deviceManufacturer'], range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['deviceManufacturer'], limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['deviceManufacturer'], limit)
    }
    if (type === DEVICES_TYPE_WITH_MODEL) {
      if (sorting === SORTINGS_TOP)
        return aggregateTopRecords(ids, ['deviceManufacturer', 'deviceName'], range, limit, dateDetails)
      if (sorting === SORTINGS_NEW) return aggregateNewRecords(ids, ['deviceManufacturer', 'deviceName'], limit)
      if (sorting === SORTINGS_RECENT) return aggregateRecentRecords(ids, ['deviceManufacturer', 'deviceName'], limit)
    }
  })()

  const enhanceId = (id) => {
    if (type === DEVICES_TYPE_NO_MODEL) return `${id.deviceManufacturer}`
    if (type === DEVICES_TYPE_WITH_MODEL) return `${id.deviceManufacturer} ${id.deviceName}`
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

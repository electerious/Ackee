import aggregateNewRecords from '../aggregations/aggregate-new-records.js'
import aggregateRecentRecords from '../aggregations/aggregate-recent-records.js'
import aggregateTopRecords from '../aggregations/aggregate-top-records.js'
import {
  SIZES_TYPE_BROWSER_HEIGHT,
  SIZES_TYPE_BROWSER_RESOLUTION,
  SIZES_TYPE_BROWSER_WIDTH,
  SIZES_TYPE_SCREEN_HEIGHT,
  SIZES_TYPE_SCREEN_RESOLUTION,
  SIZES_TYPE_SCREEN_WIDTH,
} from '../constants/sizes.js'
import { SORTINGS_NEW, SORTINGS_RECENT, SORTINGS_TOP } from '../constants/sortings.js'
import Record from '../models/record.js'
import recursiveId from '../utils/recursive-id.js'

const get = async (ids, sorting, type, range, limit, dateDetails) => {
  const aggregation = (() => {
    if (sorting === SORTINGS_TOP) {
      if (type === SIZES_TYPE_BROWSER_WIDTH)
        return aggregateTopRecords(ids, ['browserWidth'], range, limit, dateDetails)
      if (type === SIZES_TYPE_BROWSER_HEIGHT)
        return aggregateTopRecords(ids, ['browserHeight'], range, limit, dateDetails)
      if (type === SIZES_TYPE_BROWSER_RESOLUTION)
        return aggregateTopRecords(ids, ['browserWidth', 'browserHeight'], range, limit, dateDetails)
      if (type === SIZES_TYPE_SCREEN_WIDTH) return aggregateTopRecords(ids, ['screenWidth'], range, limit, dateDetails)
      if (type === SIZES_TYPE_SCREEN_HEIGHT)
        return aggregateTopRecords(ids, ['screenHeight'], range, limit, dateDetails)
      if (type === SIZES_TYPE_SCREEN_RESOLUTION)
        return aggregateTopRecords(ids, ['screenWidth', 'screenHeight'], range, limit, dateDetails)
    }
    if (sorting === SORTINGS_NEW) {
      if (type === SIZES_TYPE_BROWSER_WIDTH) return aggregateNewRecords(ids, ['browserWidth'], limit)
      if (type === SIZES_TYPE_BROWSER_HEIGHT) return aggregateNewRecords(ids, ['browserHeight'], limit)
      if (type === SIZES_TYPE_BROWSER_RESOLUTION)
        return aggregateNewRecords(ids, ['browserWidth', 'browserHeight'], limit)
      if (type === SIZES_TYPE_SCREEN_WIDTH) return aggregateNewRecords(ids, ['screenWidth'], limit)
      if (type === SIZES_TYPE_SCREEN_HEIGHT) return aggregateNewRecords(ids, ['screenHeight'], limit)
      if (type === SIZES_TYPE_SCREEN_RESOLUTION) return aggregateNewRecords(ids, ['screenWidth', 'screenHeight'], limit)
    }
    if (sorting === SORTINGS_RECENT) {
      if (type === SIZES_TYPE_BROWSER_WIDTH) return aggregateRecentRecords(ids, ['browserWidth'], limit)
      if (type === SIZES_TYPE_BROWSER_HEIGHT) return aggregateRecentRecords(ids, ['browserHeight'], limit)
      if (type === SIZES_TYPE_BROWSER_RESOLUTION)
        return aggregateRecentRecords(ids, ['browserWidth', 'browserHeight'], limit)
      if (type === SIZES_TYPE_SCREEN_WIDTH) return aggregateRecentRecords(ids, ['screenWidth'], limit)
      if (type === SIZES_TYPE_SCREEN_HEIGHT) return aggregateRecentRecords(ids, ['screenHeight'], limit)
      if (type === SIZES_TYPE_SCREEN_RESOLUTION)
        return aggregateRecentRecords(ids, ['screenWidth', 'screenHeight'], limit)
    }
  })()

  const enhanceId = (id) => {
    if (type === SIZES_TYPE_BROWSER_WIDTH) return `${id.browserWidth}px`
    if (type === SIZES_TYPE_BROWSER_HEIGHT) return `${id.browserHeight}px`
    if (type === SIZES_TYPE_BROWSER_RESOLUTION) return `${id.browserWidth}px x ${id.browserHeight}px`
    if (type === SIZES_TYPE_SCREEN_WIDTH) return `${id.screenWidth}px`
    if (type === SIZES_TYPE_SCREEN_HEIGHT) return `${id.screenHeight}px`
    if (type === SIZES_TYPE_SCREEN_RESOLUTION) return `${id.screenWidth}px x ${id.screenHeight}px`
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

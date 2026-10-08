import aggregateActiveVisitors from '../aggregations/aggregate-active-visitors.js'
import Record from '../models/record.js'

const getActiveVisitors = async (ids, dateDetails) => {
  const enhance = (entries) => {
    const entry = entries[0]
    return entry == null ? 0 : entry.count
  }

  return enhance(await Record.aggregate(aggregateActiveVisitors(ids, dateDetails)))
}

export default getActiveVisitors

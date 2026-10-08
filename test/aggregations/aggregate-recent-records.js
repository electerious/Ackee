import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import aggregateRecentRecords from '../../src/aggregations/aggregate-recent-records.js'

test('return aggregation', (t) => {
  const result = aggregateRecentRecords(uuid(), ['osName', 'osVersion'])

  t.true(Array.isArray(result))
})

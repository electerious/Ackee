import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import aggregateTopRecords from '../../src/aggregations/aggregate-top-records.js'
import createDate from '../../src/utils/create-date.js'

test('return aggregation', (t) => {
  const result = aggregateTopRecords(uuid(), ['osName', 'osVersion'], createDate())

  t.true(Array.isArray(result))
})

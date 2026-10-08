import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import aggregateActiveVisitors from '../../src/aggregations/aggregate-active-visitors.js'
import createDate from '../../src/utils/create-date.js'

test('return aggregation', (t) => {
  const result = aggregateActiveVisitors(uuid(), createDate())

  t.true(Array.isArray(result))
})

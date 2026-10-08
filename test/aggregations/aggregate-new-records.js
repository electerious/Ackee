import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import aggregateNewRecords from '../../src/aggregations/aggregate-new-records.js'

test('return aggregation', (t) => {
  const result = aggregateNewRecords(uuid(), ['siteReferrer'])

  t.true(Array.isArray(result))
})

import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'

import aggregateViews from '../../src/aggregations/aggregate-views.js'
import { INTERVALS_DAILY } from '../../src/constants/intervals.js'
import createDate from '../../src/utils/create-date.js'

test('return unique aggregation', (t) => {
  const result = aggregateViews(uuid(), true, INTERVALS_DAILY, 14, createDate())

  t.true(Array.isArray(result))
})

test('return non-unique aggregation', (t) => {
  const result = aggregateViews(uuid(), false, INTERVALS_DAILY, 14, createDate())

  t.true(Array.isArray(result))
})

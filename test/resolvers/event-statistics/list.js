import test from 'ava'
import listen from 'test-listen'

import server from '../../../src/server.js'
import { cleanup, cleanupDatabase, connectToDatabase, fillDatabase } from '../_utils.js'
import { getStats } from './_utils.js'

const base = listen(server)

test.before(connectToDatabase)
test.after.always(cleanup(server))
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

const macro = async (t, variables, assertions) => {
  const limit = variables.limit == null ? '' : `, limit: ${variables.limit}`

  const statistics = await getStats({
    base,
    token: t.context.token.id,
    eventId: t.context.event.id,
    fragment: `
			list(sorting: ${variables.sorting}, type: ${variables.type}, range: ${variables.range}${limit}) {
				value
				count
				created
			}
		`,
  })

  assertions(t, statistics.list)
}

macro.title = (providedTitle, options) => `fetch ${Object.values(options).join(' and ')} list entries`

test(
  macro,
  {
    sorting: 'TOP',
    type: 'TOTAL',
    range: 'LAST_6_MONTHS',
  },
  (t, entries) => {
    t.is(entries.length, 14)
    t.is(entries[0].value, 'Key 14')
    t.is(entries[0].count, 14)
  },
)

test(
  macro,
  {
    sorting: 'TOP',
    type: 'AVERAGE',
    range: 'LAST_6_MONTHS',
  },
  (t, entries) => {
    t.is(entries.length, 14)
    t.is(entries[0].value, 'Key 14')
    t.is(entries[0].count, 14)
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'TOTAL',
    range: 'LAST_6_MONTHS',
  },
  (t, entries) => {
    t.is(entries.length, 14)
    t.is(entries[0].value, 'Key 1')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'TOTAL',
    range: 'LAST_6_MONTHS',
    limit: 1,
  },
  (t, entries) => {
    t.is(entries.length, 1)
    t.is(entries[0].value, 'Key 1')
  },
)

test(
  macro,
  {
    sorting: 'NEW',
    type: 'TOTAL',
    range: 'LAST_6_MONTHS',
  },
  (t, entries) => {
    t.is(entries.length, 14)
    t.true(entries[0].value.includes('Key'))
    t.is(typeof entries[0].count, 'number')
  },
)

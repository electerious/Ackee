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
    domainId: t.context.domain.id,
    fragment: `
			referrers(sorting: ${variables.sorting}, type: ${variables.type}, range: ${variables.range}${limit}) {
				value
				count
				created
			}
		`,
  })

  assertions(t, statistics.referrers)
}

macro.title = (providedTitle, options) => `fetch ${Object.values(options).join(' and ')} referrers`

test(
  macro,
  {
    sorting: 'TOP',
    type: 'WITH_SOURCE',
    range: 'LAST_6_MONTHS',
  },
  (t, referrers) => {
    t.is(referrers.length, 2)
    t.is(referrers[0].value, 'Newsletter')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'WITH_SOURCE',
    range: 'LAST_6_MONTHS',
  },
  (t, referrers) => {
    t.is(referrers.length, 14)
    t.is(referrers[0].value, 'https://google.com/')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'WITH_SOURCE',
    range: 'LAST_6_MONTHS',
    limit: 1,
  },
  (t, referrers) => {
    t.is(referrers.length, 1)
    t.is(referrers[0].value, 'https://google.com/')
  },
)

test(
  macro,
  {
    sorting: 'NEW',
    type: 'WITH_SOURCE',
    range: 'LAST_6_MONTHS',
  },
  (t, referrers) => {
    t.is(referrers.length, 2)
    t.is(referrers[0].value, 'https://google.com/')
  },
)

test(
  macro,
  {
    sorting: 'TOP',
    type: 'NO_SOURCE',
    range: 'LAST_6_MONTHS',
  },
  (t, referrers) => {
    t.is(referrers.length, 1)
    t.is(referrers[0].value, 'https://google.com/')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'NO_SOURCE',
    range: 'LAST_6_MONTHS',
  },
  (t, referrers) => {
    t.is(referrers.length, 14)
    t.is(referrers[0].value, 'https://google.com/')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'NO_SOURCE',
    range: 'LAST_6_MONTHS',
    limit: 1,
  },
  (t, referrers) => {
    t.is(referrers.length, 1)
    t.is(referrers[0].value, 'https://google.com/')
  },
)

test(
  macro,
  {
    sorting: 'NEW',
    type: 'NO_SOURCE',
    range: 'LAST_6_MONTHS',
  },
  (t, referrers) => {
    t.is(referrers.length, 1)
    t.is(referrers[0].value, 'https://google.com/')
  },
)

test(
  macro,
  {
    sorting: 'TOP',
    type: 'ONLY_SOURCE',
    range: 'LAST_6_MONTHS',
  },
  (t, referrers) => {
    t.is(referrers.length, 1)
    t.is(referrers[0].value, 'Newsletter')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'ONLY_SOURCE',
    range: 'LAST_6_MONTHS',
  },
  (t, referrers) => {
    t.is(referrers.length, 9)
    t.is(referrers[0].value, 'Newsletter')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'ONLY_SOURCE',
    range: 'LAST_6_MONTHS',
    limit: 1,
  },
  (t, referrers) => {
    t.is(referrers.length, 1)
    t.is(referrers[0].value, 'Newsletter')
  },
)

test(
  macro,
  {
    sorting: 'NEW',
    type: 'ONLY_SOURCE',
    range: 'LAST_6_MONTHS',
  },
  (t, referrers) => {
    t.is(referrers.length, 1)
    t.is(referrers[0].value, 'Newsletter')
  },
)

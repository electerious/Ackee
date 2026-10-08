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
			browsers(sorting: ${variables.sorting}, type: ${variables.type}, range: ${variables.range}${limit}) {
				value
				count
				created
			}
		`,
  })

  assertions(t, statistics.browsers)
}

macro.title = (providedTitle, options) => `fetch ${Object.values(options).join(' and ')} pages`

test(
  macro,
  {
    sorting: 'TOP',
    type: 'NO_VERSION',
    range: 'LAST_6_MONTHS',
  },
  (t, browsers) => {
    t.is(browsers.length, 1)
    t.is(browsers[0].value, 'Safari')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'NO_VERSION',
    range: 'LAST_6_MONTHS',
  },
  (t, browsers) => {
    t.is(browsers.length, 14)
    t.is(browsers[0].value, 'Safari')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'NO_VERSION',
    range: 'LAST_6_MONTHS',
    limit: 1,
  },
  (t, browsers) => {
    t.is(browsers.length, 1)
    t.is(browsers[0].value, 'Safari')
  },
)

test(
  macro,
  {
    sorting: 'NEW',
    type: 'NO_VERSION',
    range: 'LAST_6_MONTHS',
  },
  (t, browsers) => {
    t.is(browsers.length, 1)
    t.is(browsers[0].value, 'Safari')
  },
)

test(
  macro,
  {
    sorting: 'TOP',
    type: 'WITH_VERSION',
    range: 'LAST_6_MONTHS',
  },
  (t, browsers) => {
    t.is(browsers.length, 2)
    t.is(browsers[0].value, 'Safari 14.0')
    t.is(browsers[1].value, 'Safari 13.0')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'WITH_VERSION',
    range: 'LAST_6_MONTHS',
  },
  (t, browsers) => {
    t.is(browsers.length, 14)
    t.is(browsers[0].value, 'Safari 14.0')
    t.is(browsers[8].value, 'Safari 13.0')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    type: 'WITH_VERSION',
    range: 'LAST_6_MONTHS',
    limit: 1,
  },
  (t, browsers) => {
    t.is(browsers.length, 1)
    t.is(browsers[0].value, 'Safari 14.0')
  },
)

test(
  macro,
  {
    sorting: 'NEW',
    type: 'WITH_VERSION',
    range: 'LAST_6_MONTHS',
  },
  (t, browsers) => {
    t.is(browsers.length, 2)
    t.is(browsers[0].value, 'Safari 14.0')
    t.is(browsers[1].value, 'Safari 13.0')
  },
)

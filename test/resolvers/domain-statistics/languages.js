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
			languages(sorting: ${variables.sorting}, range: ${variables.range}${limit}) {
				value
				count
				created
			}
		`,
  })

  assertions(t, statistics.languages)
}

macro.title = (providedTitle, options) => `fetch ${Object.values(options).join(' and ')} languages`

test(
  macro,
  {
    sorting: 'TOP',
    range: 'LAST_6_MONTHS',
  },
  (t, languages) => {
    t.is(languages.length, 1)
    t.is(languages[0].value, 'English')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    range: 'LAST_6_MONTHS',
  },
  (t, languages) => {
    t.is(languages.length, 14)
    t.is(languages[0].value, 'English')
  },
)

test(
  macro,
  {
    sorting: 'RECENT',
    range: 'LAST_6_MONTHS',
    limit: 1,
  },
  (t, languages) => {
    t.is(languages.length, 1)
    t.is(languages[0].value, 'English')
  },
)

test(
  macro,
  {
    sorting: 'NEW',
    range: 'LAST_6_MONTHS',
  },
  (t, languages) => {
    t.is(languages.length, 1)
    t.is(languages[0].value, 'English')
  },
)

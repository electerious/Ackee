import test from 'ava'

import createDate from '../../src/utils/createDate.js'
import serverTimeZone from '../../src/utils/timeZone.js'

test('uses a valid user timezone', (t) => {
  t.is(createDate('UTC').userTimeZone, 'UTC')
})

test('falls back to the server timezone for an invalid user timezone', (t) => {
  t.is(createDate('not/a-timezone').userTimeZone, serverTimeZone)
})

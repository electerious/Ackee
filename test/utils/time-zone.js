import test from 'ava'

import timeZone from '../../src/utils/time-zone.js'

test('returns timeZone', (t) => {
  new Intl.DateTimeFormat(undefined, { timeZone })
  t.pass()
})

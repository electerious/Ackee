import test from 'ava'

import Action from '../../src/models/Action.js'
import Domain from '../../src/models/Domain.js'
import Event from '../../src/models/Event.js'
import PermanentToken from '../../src/models/PermanentToken.js'
import Record from '../../src/models/Record.js'

const hasValidationError = async (Model, data, path) => {
  const error = await new Model(data).validate().catch((error_) => error_)
  return error?.errors[path] != null
}

test('limits action key and details', async (t) => {
  t.true(await hasValidationError(Action, { eventId: 'event', value: 1, key: 'x'.repeat(501) }, 'key'))
  t.true(
    await hasValidationError(Action, { eventId: 'event', value: 1, key: 'key', details: 'x'.repeat(2001) }, 'details'),
  )
})

test('limits domain title', async (t) => {
  t.true(await hasValidationError(Domain, { title: 'x'.repeat(501) }, 'title'))
})

test('limits event title', async (t) => {
  t.true(await hasValidationError(Event, { title: 'x'.repeat(501), type: 'TOTAL_CHART' }, 'title'))
})

test('limits permanent token title', async (t) => {
  t.true(await hasValidationError(PermanentToken, { title: 'x'.repeat(501) }, 'title'))
})

test('limits record fields', async (t) => {
  const data = {
    domainId: 'domain',
    siteLocation: 'https://example.com',
    source: 'x'.repeat(501),
  }

  t.true(await hasValidationError(Record, data, 'source'))
})

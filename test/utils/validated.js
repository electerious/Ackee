import test from 'ava'

import KnownError from '../../src/utils/KnownError.js'
import validated from '../../src/utils/validated.js'

test('return the result of a write', async (t) => {
  t.is(await validated(Promise.resolve('entry')), 'entry')
})

test('turn a validation error into a known error', async (t) => {
  const error = Object.assign(new Error('Validation failed'), {
    name: 'ValidationError',
    errors: { title: { message: 'Path `title` is required.' } },
  })

  const thrown = await t.throwsAsync(validated(Promise.reject(error)))

  t.true(thrown instanceof KnownError)
  t.is(thrown.message, 'Path `title` is required')
})

test('pass any other error through', async (t) => {
  const error = new Error('Connection lost')

  const thrown = await t.throwsAsync(validated(Promise.reject(error)))

  t.is(thrown, error)
})

import test from 'ava'
import mockedEnv from 'mocked-env'
import listen from 'test-listen'

import server from '../src/server.js'
import { job as saltJob } from '../src/utils/salt.js'
import { api } from './_utils.js'

const base = listen(server)

test.after.always(() => {
  server.close()
  saltJob.cancel()
})

test('return cors headers with no origin if hostname not whitelisted in env var', async (t) => {
  const restore = mockedEnv({
    ACKEE_ALLOW_ORIGIN: 'https://example.com',
  })

  const { headers } = await api(base, { query: '{ __typename }' })

  t.is(headers.get('Access-Control-Allow-Origin'), null)
  t.is(headers.get('Access-Control-Allow-Methods'), null)
  t.is(headers.get('Access-Control-Allow-Headers'), null)
  t.is(headers.get('Access-Control-Allow-Credentials'), null)
  t.is(headers.get('Access-Control-Max-Age'), null)

  restore()
})

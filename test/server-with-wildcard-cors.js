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

test('return cors headers if env vars specify wildcard', async (t) => {
  const restore = mockedEnv({
    ACKEE_ALLOW_ORIGIN: '*',
  })

  const { headers } = await api(base, { query: '{ __typename }' })

  t.is(headers.get('Access-Control-Allow-Origin'), '*')
  t.is(headers.get('Access-Control-Allow-Methods'), 'GET, POST, PATCH, OPTIONS')
  t.is(headers.get('Access-Control-Allow-Headers'), 'Content-Type, Authorization, Time-Zone')
  t.is(headers.get('Access-Control-Allow-Credentials'), 'true')
  t.is(headers.get('Access-Control-Max-Age'), '3600')

  restore()
})

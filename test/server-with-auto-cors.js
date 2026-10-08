import test from 'ava'
import mockedEnv from 'mocked-env'
import listen from 'test-listen'

import Domain from '../src/models/domain.js'
import server from '../src/server.js'
import { api } from './_utils.js'
import { cleanup, connectToDatabase } from './resolvers/_utils.js'

const base = listen(server)

test.before(connectToDatabase)
test.after.always(cleanup(server))
test.beforeEach(async (t) => {
  t.context.domain1 = await Domain.create({ title: 'fqdn.example.com' })
  t.context.domain2 = await Domain.create({ title: 'No fqdn' })
})
test.afterEach.always(async (t) => {
  await Domain.findOneAndDelete({ id: t.context.domain1.id })
  await Domain.findOneAndDelete({ id: t.context.domain2.id })
})

test('return cors headers based on fully qualifed domain names', async (t) => {
  const restore = mockedEnv({
    ACKEE_AUTO_ORIGIN: 'true',
  })

  const { headers: fqdnHeaders } = await api(base, { query: '{ __typename }' }, null, {
    Origin: 'https://fqdn.example.com',
  })

  t.is(fqdnHeaders.get('Access-Control-Allow-Origin'), 'https://fqdn.example.com')
  t.is(fqdnHeaders.get('Access-Control-Allow-Methods'), 'GET, POST, PATCH, OPTIONS')
  t.is(fqdnHeaders.get('Access-Control-Allow-Headers'), 'Content-Type, Authorization, Time-Zone')
  t.is(fqdnHeaders.get('Access-Control-Allow-Credentials'), 'true')

  const { headers: noFqdnHeaders } = await api(base, { query: '{ __typename }' }, null, {
    Origin: 'https://not-in-list.example.com',
  })

  t.is(noFqdnHeaders.get('Access-Control-Allow-Origin'), null)
  t.is(noFqdnHeaders.get('Access-Control-Allow-Methods'), null)
  t.is(noFqdnHeaders.get('Access-Control-Allow-Headers'), null)
  t.is(noFqdnHeaders.get('Access-Control-Allow-Credentials'), null)

  restore()
})

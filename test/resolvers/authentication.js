import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'
import listen from 'test-listen'

import server from '../../src/server.js'
import PermanentToken from '../../src/models/PermanentToken.js'
import Token from '../../src/models/Token.js'
import { day } from '../../src/utils/times.js'
import { api } from '../_utils.js'
import { cleanup, cleanupDatabase, connectToDatabase, fillDatabase, gql } from './_utils.js'

const base = listen(server)

const body = {
  query: gql`
    query domains {
      domains {
        id
      }
    }
  `,
}

test.before(connectToDatabase)
test.after.always(cleanup(server))
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

const errorWith = async (headers) => {
  const { json } = await api(base, body, undefined, headers)
  return json.errors?.[0]?.message
}

test('reject a request without a token', async (t) => {
  t.is(await errorWith({}), 'Token missing')
})

test('reject a request with another scheme', async (t) => {
  t.is(await errorWith({ Authorization: `Basic ${t.context.token.id}` }), 'Token missing')
})

test('reject a request with an empty bearer', async (t) => {
  t.is(await errorWith({ Authorization: 'Bearer' }), 'Token missing')
})

test('reject an unknown token', async (t) => {
  t.is(await errorWith({ Authorization: `Bearer ${uuid()}` }), 'Token invalid')
})

test('reject an expired token', async (t) => {
  // The default TTL is one day.
  const expired = await Token.create({ updated: Date.now() - 2 * day })

  t.is(await errorWith({ Authorization: `Bearer ${expired.id}` }), 'Token invalid')
})

test('accept a token and keep it alive', async (t) => {
  const before = (await Token.findOne({ id: t.context.token.id })).updated

  const { json } = await api(base, body, t.context.token.id)
  const after = (await Token.findOne({ id: t.context.token.id })).updated

  t.is(json.errors, undefined)
  t.true(Array.isArray(json.data.domains))
  t.true(after > before)
})

test('accept a permanent token and record its use', async (t) => {
  const before = (await PermanentToken.findOne({ id: t.context.permanentToken.id })).updated

  const { json } = await api(base, body, t.context.permanentToken.id)
  const after = await PermanentToken.findOne({ id: t.context.permanentToken.id })

  t.is(json.errors, undefined)
  t.true(Array.isArray(json.data.domains))
  t.true(after.updated > before)
  t.is(after.title, 'Example')
})

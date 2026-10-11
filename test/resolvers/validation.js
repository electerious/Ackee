import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'
import listen from 'test-listen'

import server from '../../src/server.js'
import { api } from '../_utils.js'
import { cleanup, cleanupDatabase, connectToDatabase, fillDatabase, gql } from './_utils.js'

const base = listen(server)

// One character over the limit of every title and key in the models.
const tooLong = 'x'.repeat(501)
const lengthError = 'is longer than the maximum allowed length (500)'

test.before(connectToDatabase)
test.after.always(cleanup(server))
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

const errorOf = async (t, query, variables) => {
  const { json } = await api(base, { query, variables }, t.context.token.id)

  t.is(json.errors?.length, 1)
  return json.errors[0].message
}

test('reject a domain with a long title', async (t) => {
  const query = gql`
    mutation createDomain($input: CreateDomainInput!) {
      createDomain(input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, { input: { title: tooLong } })

  t.true(message.includes(lengthError))
})

test('reject a domain update with a long title', async (t) => {
  const query = gql`
    mutation updateDomain($id: ID!, $input: UpdateDomainInput!) {
      updateDomain(id: $id, input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, { id: t.context.domain.id, input: { title: tooLong } })

  t.true(message.includes(lengthError))
})

test('reject an update of an unknown domain', async (t) => {
  const query = gql`
    mutation updateDomain($id: ID!, $input: UpdateDomainInput!) {
      updateDomain(id: $id, input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, { id: uuid(), input: { title: 'Example' } })

  t.is(message, 'Unknown domain')
})

test('reject an event with a long title', async (t) => {
  const query = gql`
    mutation createEvent($input: CreateEventInput!) {
      createEvent(input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, { input: { title: tooLong, type: 'TOTAL_CHART' } })

  t.true(message.includes(lengthError))
})

test('reject an event update with a long title', async (t) => {
  const query = gql`
    mutation updateEvent($id: ID!, $input: UpdateEventInput!) {
      updateEvent(id: $id, input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, { id: t.context.event.id, input: { title: tooLong, type: 'TOTAL_CHART' } })

  t.true(message.includes(lengthError))
})

test('reject a permanent token with a long title', async (t) => {
  const query = gql`
    mutation createPermanentToken($input: CreatePermanentTokenInput!) {
      createPermanentToken(input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, { input: { title: tooLong } })

  t.true(message.includes(lengthError))
})

test('reject a permanent token update with a long title', async (t) => {
  const query = gql`
    mutation updatePermanentToken($id: ID!, $input: UpdatePermanentTokenInput!) {
      updatePermanentToken(id: $id, input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, { id: t.context.permanentToken.id, input: { title: tooLong } })

  t.true(message.includes(lengthError))
})

test('reject an action with a long key', async (t) => {
  const query = gql`
    mutation createAction($eventId: ID!, $input: CreateActionInput!) {
      createAction(eventId: $eventId, input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, { eventId: t.context.event.id, input: { key: tooLong, value: 1 } })

  t.true(message.includes(lengthError))
})

test('reject an action update with a long key', async (t) => {
  const create = gql`
    mutation createAction($eventId: ID!, $input: CreateActionInput!) {
      createAction(eventId: $eventId, input: $input) {
        payload {
          id
        }
      }
    }
  `
  const { json } = await api(
    base,
    { query: create, variables: { eventId: t.context.event.id, input: { key: 'Key', value: 1 } } },
    t.context.token.id,
  )

  const query = gql`
    mutation updateAction($id: ID!, $input: UpdateActionInput!) {
      updateAction(id: $id, input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, { id: json.data.createAction.payload.id, input: { key: tooLong, value: 1 } })

  t.true(message.includes(lengthError))
})

test('reject a record with a long language code', async (t) => {
  const query = gql`
    mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
      createRecord(domainId: $domainId, input: $input) {
        success
      }
    }
  `
  const message = await errorOf(t, query, {
    domainId: t.context.domain.id,
    input: { siteLocation: 'https://example.com/', siteLanguage: 'eng' },
  })

  t.true(message.includes('is longer than the maximum allowed length (2)'))
})

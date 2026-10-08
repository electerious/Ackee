import test from 'ava'
import { randomUUID as uuid } from 'node:crypto'
import listen from 'test-listen'

import server from '../../src/server.js'
import { api } from '../_utils.js'
import { cleanup, cleanupDatabase, connectToDatabase, fillDatabase, gql } from './_utils.js'

const base = listen(server)

let validPermanentToken

const defaultTitle = uuid()
const updatedTitle = uuid()

test.before(connectToDatabase)
test.after.always(cleanup(server))
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

test.serial('create permanent token', async (t) => {
  const body = {
    query: gql`
      mutation createPermanentToken($input: CreatePermanentTokenInput!) {
        createPermanentToken(input: $input) {
          success
          payload {
            id
            title
          }
        }
      }
    `,
    variables: {
      input: {
        title: defaultTitle,
      },
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.true(json.data.createPermanentToken.success)
  t.is(typeof json.data.createPermanentToken.payload.id, 'string')
  t.is(json.data.createPermanentToken.payload.title, defaultTitle)

  // Save permanent token for the next test
  validPermanentToken = json.data.createPermanentToken.payload
})

test.serial('update permanent token', async (t) => {
  const body = {
    query: gql`
      mutation updatePermanentToken($id: ID!, $input: UpdatePermanentTokenInput!) {
        updatePermanentToken(id: $id, input: $input) {
          success
          payload {
            id
            title
          }
        }
      }
    `,
    variables: {
      id: validPermanentToken.id,
      input: {
        title: updatedTitle,
      },
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.true(json.data.updatePermanentToken.success)
  t.is(json.data.updatePermanentToken.payload.id, validPermanentToken.id)
  t.is(json.data.updatePermanentToken.payload.title, updatedTitle)

  // Save permanent token for the next test
  validPermanentToken = json.data.updatePermanentToken.payload
})

test.serial('fetch permanent tokens', async (t) => {
  const body = {
    query: gql`
      query fetchPermanentTokens {
        permanentTokens {
          id
          title
        }
      }
    `,
  }

  const { json } = await api(base, body, t.context.token.id)

  const permanentTokens = json.data.permanentTokens
  const permanentToken = permanentTokens.find((permanentToken) => permanentToken.id === validPermanentToken.id)

  t.is(permanentToken.title, validPermanentToken.title)
})

test.serial('fetch permanent token', async (t) => {
  const body = {
    query: gql`
      query fetchPermanentToken($id: ID!) {
        permanentToken(id: $id) {
          id
          title
        }
      }
    `,
    variables: {
      id: validPermanentToken.id,
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.is(json.data.permanentToken.id, validPermanentToken.id)
  t.is(json.data.permanentToken.title, validPermanentToken.title)
})

test.serial('delete permanent token', async (t) => {
  const body = {
    query: gql`
      mutation deletePermanentToken($id: ID!) {
        deletePermanentToken(id: $id) {
          success
        }
      }
    `,
    variables: {
      id: validPermanentToken.id,
    },
  }

  const { json } = await api(base, body, t.context.token.id)

  t.true(json.data.deletePermanentToken.success)
})

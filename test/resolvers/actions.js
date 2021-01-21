'use strict'

const test = require('ava')
const listen = require('test-listen')
const uuid = require('uuid').v4

const server = require('../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase, api } = require('./_utils')

const base = listen(server)

let validAction
let ignoredAction

const defaultKey = uuid()
const defaultValue = 1
const updatedKey = uuid()
const updatedValue = null

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

test.serial('create action', async (t) => {

	const body = {
		query: `
			mutation createAction($eventId: ID!, $input: CreateActionInput!) {
				createAction(eventId: $eventId, input: $input) {
					success
					payload {
						id
						key
						value
					}
				}
			}
		`,
		variables: {
			eventId: t.context.event.id,
			input: {
				key: defaultKey,
				value: defaultValue
			}
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	t.true(json.data.createAction.success)
	t.is(typeof json.data.createAction.payload.id, 'string')
	t.is(json.data.createAction.payload.key, defaultKey)
	t.is(json.data.createAction.payload.value, defaultValue)

	// Save action for the next test
	validAction = json.data.createAction.payload

})

test.serial('update action', async (t) => {

	const body = {
		query: `
			mutation updateAction($id: ID!, $input: UpdateActionInput!) {
				updateAction(id: $id, input: $input) {
					success
				}
			}
		`,
		variables: {
			id: validAction.id,
			input: {
				key: updatedKey,
				value: updatedValue
			}
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	t.true(json.data.updateAction.success)

})

test.serial('ignore action creation when logged in', async (t) => {

	const body = {
		query: `
			mutation createAction($eventId: ID!, $input: CreateActionInput!) {
				createAction(eventId: $eventId, input: $input) {
					success
					payload {
						id
					}
				}
			}
		`,
		variables: {
			eventId: t.context.event.id,
			input: {
				key: uuid()
			}
		}
	}

	const { json } = await api(base, body, t.context.token.id, {
		Cookie: 'ackee_ignore=1'
	})

	t.true(json.data.createAction.success)
	t.is(json.data.createAction.payload.id, '88888888-8888-8888-8888-888888888888')

	// Save action for the next test
	ignoredAction = json.data.createAction.payload

})

test.serial('ignore action update when logged in', async (t) => {

	const body = {
		query: `
			mutation updateAction($id: ID!, $input: UpdateActionInput!) {
				updateAction(id: $id, input: $input) {
					success
				}
			}
		`,
		variables: {
			id: ignoredAction.id,
			input: {
				key: uuid()
			}
		}
	}

	const { json } = await api(base, body, t.context.token.id, {
		Cookie: 'ackee_ignore=1'
	})

	t.true(json.data.updateAction.success)

})
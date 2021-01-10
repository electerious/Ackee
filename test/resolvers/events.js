'use strict'

const test = require('ava')
const listen = require('test-listen')
const uuid = require('uuid').v4

const server = require('../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase, api } = require('./_utils')

const base = listen(server)

let validEvent

const defaultTitle = uuid()
const defaultType = 'TOTAL_CHART'
const updatedTitle = uuid()
const updatedType = 'TOTAL_LIST'

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

test.serial('create event', async (t) => {

	const body = {
		query: `
			mutation createEvent($input: CreateEventInput!) {
				createEvent(input: $input) {
					success
					payload {
						id
						title
						type
					}
				}
			}
		`,
		variables: {
			input: {
				title: defaultTitle,
				type: defaultType
			}
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	t.true(json.data.createEvent.success)
	t.is(typeof json.data.createEvent.payload.id, 'string')
	t.is(json.data.createEvent.payload.title, defaultTitle)
	t.is(json.data.createEvent.payload.type, defaultType)

	// Save event for the next test
	validEvent = json.data.createEvent.payload

})

test.serial('update event', async (t) => {

	const body = {
		query: `
			mutation updateEvent($id: ID!, $input: UpdateEventInput!) {
				updateEvent(id: $id, input: $input) {
					success
					payload {
						id
						title
						type
					}
				}
			}
		`,
		variables: {
			id: validEvent.id,
			input: {
				title: updatedTitle,
				type: updatedType
			}
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	t.true(json.data.updateEvent.success)
	t.is(json.data.updateEvent.payload.id, validEvent.id)
	t.is(json.data.updateEvent.payload.title, updatedTitle)
	t.is(json.data.updateEvent.payload.type, updatedType)

	// Save event for the next test
	validEvent = json.data.updateEvent.payload

})

test.serial('fetch events', async (t) => {

	const body = {
		query: `
			query fetchEvents {
				events {
					id
					title
					type
				}
			}
		`
	}

	const { json } = await api(base, body, t.context.token.id)

	const events = json.data.events
	const event = events.find((event) => event.id === validEvent.id)

	t.is(event.title, validEvent.title)
	t.is(event.type, validEvent.type)

})

test.serial('fetch event', async (t) => {

	const body = {
		query: `
			query fetchEvent($id: ID!) {
				event(id: $id) {
					id
					title
					type
				}
			}
		`,
		variables: {
			id: validEvent.id
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	t.is(json.data.event.id, validEvent.id)
	t.is(json.data.event.title, validEvent.title)
	t.is(json.data.event.type, validEvent.type)

})

test.serial('delete event', async (t) => {

	const body = {
		query: `
			mutation deleteEvent($id: ID!) {
				deleteEvent(id: $id) {
					success
				}
			}
		`,
		variables: {
			id: validEvent.id
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	t.true(json.data.deleteEvent.success)

})
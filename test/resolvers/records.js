'use strict'

const test = require('ava')
const listen = require('test-listen')

const server = require('../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase, api } = require('./_utils')

const base = listen(server)

let validRecord
let ignoredRecord

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

test.serial('create record', async (t) => {

	const body = {
		query: `
			mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
				createRecord(domainId: $domainId, input: $input) {
					success
					payload {
						id
					}
				}
			}
		`,
		variables: {
			domainId: t.context.domain.id,
			input: {
				siteLocation: 'https://example.com/',
				siteReferrer: 'https://google.com/'
			}
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	t.true(json.data.createRecord.success)
	t.is(typeof json.data.createRecord.payload.id, 'string')

	// Save record for the next test
	validRecord = json.data.createRecord.payload

})

test.serial('update record', async (t) => {

	const body = {
		query: `
			mutation updateRecord($id: ID!) {
				updateRecord(id: $id) {
					success
				}
			}
		`,
		variables: {
			id: validRecord.id
		}
	}

	const { json } = await api(base, body, t.context.token.id)

	t.true(json.data.updateRecord.success)

})

test.serial('ignore record creation when logged in', async (t) => {

	const body = {
		query: `
			mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
				createRecord(domainId: $domainId, input: $input) {
					success
					payload {
						id
					}
				}
			}
		`,
		variables: {
			domainId: t.context.domain.id,
			input: { siteLocation: 'https://example.com/' }
		}
	}

	const { json } = await api(base, body, t.context.token.id, {
		Cookie: 'ackee_ignore=1'
	})

	t.true(json.data.createRecord.success)
	t.is(json.data.createRecord.payload.id, '88888888-8888-8888-8888-888888888888')

	// Save record for the next test
	ignoredRecord = json.data.createRecord.payload

})

test.serial('ignore record update when logged in', async (t) => {

	const body = {
		query: `
			mutation updateRecord($id: ID!) {
				updateRecord(id: $id) {
					success
				}
			}
		`,
		variables: {
			id: ignoredRecord.id
		}
	}

	const { json } = await api(base, body, t.context.token.id, {
		Cookie: 'ackee_ignore=1'
	})

	t.true(json.data.updateRecord.success)

})
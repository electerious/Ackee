'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')

const server = require('../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase } = require('./_utils')

const base = listen(server)

let validRecord = null
let ignoredRecord = null

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

test.serial('create record', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
				createRecord(domainId: $domainId, input: $input) {
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

	const res = await fetch(url.href, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			'authorization': `Bearer ${ t.context.token.id }`,
			'Content-Type': 'application/json'
		}
	})

	const json = await res.json()

	// Save record for the next test
	validRecord = json.data.createRecord.payload

	t.true((/^[-0-9a-f]{36}$/).test(validRecord.id))

})

test.serial('update record', async (t) => {

	const url = new URL('/api', await base)

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

	const res = await fetch(url.href, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			'authorization': `Bearer ${ t.context.token.id }`,
			'Content-Type': 'application/json'
		}
	})

	const json = await res.json()

	t.true(json.data.updateRecord.success)

})

test.serial('ignore visit when logged in', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
				createRecord(domainId: $domainId, input: $input) {
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

	const res = await fetch(url.href, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			'authorization': `Bearer ${ t.context.token.id }`,
			'Content-Type': 'application/json',
			'Cookie': 'ackee_login=1'
		}
	})

	const json = await res.json()

	// Save record for the next test
	ignoredRecord = json.data.createRecord.payload

	t.is(ignoredRecord.id, '88888888-8888-8888-8888-888888888888')

})

test.serial('ignore visit update when logged in', async (t) => {

	const url = new URL('/api', await base)

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

	const res = await fetch(url.href, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			'authorization': `Bearer ${ t.context.token.id }`,
			'Content-Type': 'application/json',
			'Cookie': 'ackee_login=1'
		}
	})

	const json = await res.json()

	t.true(json.data.updateRecord.success)

})
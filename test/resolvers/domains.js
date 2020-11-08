'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')

const server = require('../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase } = require('./_utils')

const base = listen(server)

let validDomain = null

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

test.serial('create domain', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			mutation createDomain($input: CreateDomainInput!) {
				createDomain(input: $input) {
					success,
					payload {
						id
					}
				}
			}
		`,
		variables: {
			input: {
				title: 'newdomain.com'
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

	// Save domain for the next test
	validDomain = json.data.createDomain.payload

	t.true(json.data.createDomain.success)
	t.true(validDomain.id != null)

})

test.serial('update domain', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			mutation updateDomain($id: ID!, $input: UpdateDomainInput!) {
				updateDomain(id: $id, input: $input) {
					success
				}
			}
		`,
		variables: {
			id: validDomain.id,
			input: {
				title: 'updateddomain.com'
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

	t.true(json.data.updateDomain.success)

})

test.serial('fetch domains', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			query fetchDomains {
				domains {
					id
					title
				}
			}
		`
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

	const myDomain = json.data.domains.find((_) => _.id === validDomain.id)
	t.is(myDomain.title, 'updateddomain.com')

})

test.serial('delete domain', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			mutation deleteDomain($id: ID!) {
				deleteDomain(id: $id) {
					success
				}
			}
		`,
		variables: {
			id: validDomain.id
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

	t.true(json.data.deleteDomain.success)

})
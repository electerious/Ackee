'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const uuid = require('uuid').v4

const server = require('../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase } = require('./_utils')

const base = listen(server)

let validDomain = null

const defaultTitle = uuid()
const updatedTitle = uuid()

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
						title
					}
				}
			}
		`,
		variables: {
			input: {
				title: defaultTitle
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

	t.true(json.data.createDomain.success)
	t.is(typeof json.data.createDomain.payload.id, 'string')
	t.is(json.data.createDomain.payload.title, defaultTitle)

	// Save domain for the next test
	validDomain = json.data.createDomain.payload

})

test.serial('update domain', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			mutation updateDomain($id: ID!, $input: UpdateDomainInput!) {
				updateDomain(id: $id, input: $input) {
					success
					payload {
						id,
						title
					}
				}
			}
		`,
		variables: {
			id: validDomain.id,
			input: {
				title: updatedTitle
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
	t.is(json.data.updateDomain.payload.id, validDomain.id)
	t.is(json.data.updateDomain.payload.title, updatedTitle)

	// Save domain for the next test
	validDomain = json.data.updateDomain.payload

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

	const domains = json.data.domains
	const domain = domains.find((domain) => domain.id === validDomain.id)

	t.is(domain.title, validDomain.title)

})

test.serial('fetch domain', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			query fetchDomain($id: ID!) {
				domain(id: $id) {
					id
					title
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

	t.is(json.data.domain.id, validDomain.id)
	t.is(json.data.domain.title, validDomain.title)

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
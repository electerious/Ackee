'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const mockedEnv = require('mocked-env')

const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase } = require('./_utils')
const server = require('../../src/server')

const base = listen(server)

let validToken = null

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

test.serial('return token and cookie after successful login', async (t) => {

	const url = new URL('/api', await base)

	const username = 'admin'
	const password = '123456'

	const body = {
		query: `
			mutation createToken($input: CreateTokenInput!) {
				createToken(input: $input) {
					success
					payload {
						id
					}
				}
			}
		`,
		variables: {
			input: {
				username,
				password
			}
		}
	}

	const restore = mockedEnv({
		ACKEE_USERNAME: username,
		ACKEE_PASSWORD: password,
		ACKEE_ALLOW_ORIGIN: 'https://badexample.com,https://bad.example.com,https://example.com'
	})

	const res = await fetch(url.href, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Host': 'ackee.example.com'
		}
	})

	const headers = res.headers
	const json = await res.json()

	t.true(headers.get('Set-Cookie').includes('ackee_ignore=1'))
	t.true(json.data.createToken.success)
	t.is(typeof json.data.createToken.payload.id, 'string')

	// Save token for the next test
	validToken = json.data.createToken.payload

	restore()

})

test.serial('clear login cookie after successful logout', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			mutation deleteToken($id: ID!) {
				deleteToken(id: $id) {
					success
				}
			}
		`,
		variables: {
			id: validToken.id
		}
	}

	const res = await fetch(url.href, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			'Host': 'ackee.example.com'
		}
	})

	const headers = res.headers
	const json = await res.json()

	t.true(headers.get('Set-Cookie').includes('ackee_ignore=0'))
	t.true(json.data.deleteToken.success)

})
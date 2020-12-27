'use strict'

const test = require('ava')
const listen = require('test-listen')
const mockedEnv = require('mocked-env')

const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase, api } = require('./_utils')
const server = require('../../src/server')

const base = listen(server)

let validToken

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

test.serial('return token and cookie after successful login', async (t) => {

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

	const { headers, json } = await api(base, body, undefined, {
		Host: 'ackee.example.com'
	})

	t.true(headers.get('Set-Cookie').includes('ackee_ignore=1'))
	t.true(json.data.createToken.success)
	t.is(typeof json.data.createToken.payload.id, 'string')

	// Save token for the next test
	validToken = json.data.createToken.payload

	restore()

})

test.serial('clear login cookie after successful logout', async (t) => {

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

	const { json, headers } = await api(base, body, undefined, {
		Host: 'ackee.example.com'
	})

	t.true(headers.get('Set-Cookie').includes('ackee_ignore=0'))
	t.true(json.data.deleteToken.success)

})
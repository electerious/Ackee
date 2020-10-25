'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const mockedEnv = require('mocked-env')

const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase } = require('./_utils')
const server = require('../../src/server')

const base = listen(server)

let loginId = null

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

test.serial('return login token and cookie after successful login', async (t) => {

	const url = new URL('/api', await base)

	const body = {
		query: `
			mutation createToken($input: CreateTokenInput!) {
				createToken(input: $input) {
					payload {
						id
					}
				}
			}
		`,
		variables: {
			input:
				{
					username: 'mockuser',
					password: 'mockpw'
				}
		}
	}

	const restore = mockedEnv({
		ACKEE_USERNAME: 'mockuser',
		ACKEE_PASSWORD: 'mockpw',
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
	t.is(headers.get('Set-Cookie'), 'ackee_login=1; SameSite=None; Secure; Max-Age=31536000')

	const resJson = await res.json()
	loginId = resJson.data.createToken.payload.id
	t.true((/^[-0-9a-f]{36}$/).test(loginId))

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
			id: loginId
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
	t.is(headers.get('Set-Cookie'), 'ackee_login=0; SameSite=None; Secure; Max-Age=-1')

	const resJson = await res.json()
	t.true(resJson.data.deleteToken.success)

})
'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const mockedEnv = require('mocked-env')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

const server = require('../../src/server')

const base = listen(server)

// Start MongoDB Instance
const mongod = new MongoMemoryServer()

// Create connection to mongoose before all tests
test.before(async t => mongoose.connect(await mongod.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}))

let loginId = null;

test.serial('return login token and cookie after successful login', async (t) => {

    const url = new URL(await base)
    const body = {
        "query":
            `mutation createToken($input: CreateTokenInput!) {
                createToken(input: $input) {
                    payload {
                        id
                    }
                }
            }`,
        "variables": {
            "input":
                {
                    "username":"mockuser",
                    "password":"mockpw"
                }
            }
        }

    const restore = mockedEnv({
        ACKEE_USERNAME: "mockuser",
        ACKEE_PASSWORD: "mockpw",
        ACKEE_ALLOW_ORIGIN: `https://badexample.com,https://bad.example.com,https://example.com`
    })

    const res = await fetch(`${url.href}api`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 
            'Content-Type': 'application/json',
            'Host': 'ackee.example.com'
        }
    })

    const headers = res.headers
    t.is(headers.get('Set-Cookie'), 'ackee_login=1; SameSite=None; Secure; Max-Age=31536000; Domain=example.com')

    const resJson = await res.json();
    loginId = resJson.data.createToken.payload.id
    t.true(/^[-0-9a-f]{36}$/.test(loginId))

    restore()

})

test.serial('clear login cookie after successful logout', async (t) => {
    const url = new URL(await base)
    const body = {
        "query":
            `mutation deleteToken($id: ID!) {
                deleteToken(id: $id) {
                    success
                }
            }`,
        "variables": {
            "id": loginId
        }
    }

    const restore = mockedEnv({
        ACKEE_ALLOW_ORIGIN: `https://badexample.com,https://bad.example.com,https://example.com`
    })

    const res = await fetch(`${url.href}api`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 
            'Content-Type': 'application/json',
            'Host': 'ackee.example.com'
        }
    })

    const headers = res.headers
    t.is(headers.get('Set-Cookie'), 'ackee_login=0; SameSite=None; Secure; Max-Age=-1; Domain=example.com')

    const resJson = await res.json();
    t.true(resJson.data.deleteToken.success)

    restore()

})

// Disconnect MongoDB and mongoose after all tests are done
test.after.always(async t => {
    mongoose.disconnect()
    mongod.stop()
})
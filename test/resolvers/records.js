'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')

const server = require('../../src/server')
const {before, beforeEach, afterEach, after} = require('./utils')

const base = listen(server)

let visitRecordId = null;
test.before(before)
test.beforeEach(beforeEach)
test.afterEach.always(afterEach)

test.serial('record first visit', async (t) => {

    const url = new URL(await base)
    const body = {
        "query":
            `mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
                createRecord(domainId: $domainId, input: $input) {
                    payload {
                        id
                    }
                }
            }`,
        "variables": {
            "domainId": t.context.domain.id,
            "input": {"siteLocation": "https://example.com/"}
        }
    }

    const res = await fetch(`${url.href}api`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 
            'authorization': `Bearer ${t.context.token.id}`,
            'Content-Type': 'application/json'
        }
    })

    const resJson = await res.json()
    visitRecordId = resJson.data.createRecord.payload.id
    t.true(/^[-0-9a-f]{36}$/.test(visitRecordId))
})

test.serial('update subsequent visits', async (t) => {
    const url = new URL(await base)
    const body = {
        "query":
            `mutation updateRecord($id: ID!) {
                updateRecord(id: $id) {
                    success
                }
            }`,
        "variables": {
            "id": visitRecordId
        }
    }

    const res = await fetch(`${url.href}api`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 
            'authorization': `Bearer ${t.context.token.id}`,
            'Content-Type': 'application/json'
        }
    })

    const resJson = await res.json()
    t.true(resJson.data.updateRecord.success)

})

test.serial('ignore first visit if own site', async (t) => {

    const url = new URL(await base)
    const body = {
        "query":
            `mutation createRecord($domainId: ID!, $input: CreateRecordInput!) {
                createRecord(domainId: $domainId, input: $input) {
                    payload {
                        id
                    }
                }
            }`,
        "variables": {
            "domainId": t.context.domain.id,
            "input": {"siteLocation": "https://example.com/"}
        }
    }

    const res = await fetch(`${url.href}api`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 
            'authorization': `Bearer ${t.context.token.id}`,
            'Content-Type': 'application/json',
            'Cookie' : 'ackee_login=1'
        }
    })

    const resJson = await res.json()
    const visitRecordId = resJson.data.createRecord.payload.id
    t.is(visitRecordId, '88888888-8888-8888-8888-888888888888')
})

test.serial('ignore subsequent visits if own site', async (t) => {
    const url = new URL(await base)
    const body = {
        "query":
            `mutation updateRecord($id: ID!) {
                updateRecord(id: $id) {
                    success
                }
            }`,
        "variables": {
            "id": '88888888-8888-8888-8888-888888888888'
        }
    }

    const res = await fetch(`${url.href}api`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 
            'authorization': `Bearer ${t.context.token.id}`,
            'Content-Type': 'application/json',
            'Cookie' : 'ackee_login=1'
        }
    })

    const resJson = await res.json()
    t.true(resJson.data.updateRecord.success)

})

test.after.always(after)
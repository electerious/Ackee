'use strict'

const test = require('ava')

const isSrvUrl = require('../../src/utils/isSrvUrl')

test('return false for standard connection string', async (t) => {
	t.false(isSrvUrl('mongodb://example.com:27017/ackee'))
})

test('return true for srv connection string', async (t) => {
	t.true(isSrvUrl('mongodb+srv://username:pw@example.mongodb.net/ackee'))
})
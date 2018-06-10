'use strict'

const test = require('ava')
const uuid = require('uuid/v4')

const messages = require('../src/messages')

test('extract messages from an object with errors', (t) => {

	const message = uuid()
	const errors = { 0: new Error(message) }

	const result = messages(errors)

	t.is(result, message)

})
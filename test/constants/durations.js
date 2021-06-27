'use strict'

const test = require('ava')

const durations = require('../../src/constants/durations')

test('is an object', (t) => {
	t.is(typeof durations, 'object')
})
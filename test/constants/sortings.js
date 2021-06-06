'use strict'

const test = require('ava')

const sortings = require('../../src/constants/sortings')

test('is an object', (t) => {
	t.is(typeof sortings, 'object')
})
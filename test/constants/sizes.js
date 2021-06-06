'use strict'

const test = require('ava')

const sizes = require('../../src/constants/sizes')

test('is an object', (t) => {
	t.is(typeof sizes, 'object')
})
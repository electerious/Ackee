'use strict'

const test = require('ava')

const browsers = require('../../src/constants/browsers')

test('is an object', (t) => {
	t.is(typeof browsers, 'object')
})
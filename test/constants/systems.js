'use strict'

const test = require('ava')

const systems = require('../../src/constants/systems')

test('is an object', (t) => {
	t.is(typeof systems, 'object')
})
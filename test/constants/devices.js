'use strict'

const test = require('ava')

const devices = require('../../src/constants/devices')

test('is an object', (t) => {
	t.is(typeof devices, 'object')
})
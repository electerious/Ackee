'use strict'

const test = require('ava')

const os = require('../../src/constants/os')

test('is an object', async (t) => {

	t.is(typeof os, 'object')

})
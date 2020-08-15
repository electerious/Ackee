'use strict'

const test = require('ava')

const sortings = require('../../src/constants/sortings')

test('is an object', async (t) => {

	t.is(typeof sortings, 'object')

})
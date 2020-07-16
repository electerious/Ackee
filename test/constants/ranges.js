'use strict'

const test = require('ava')

const ranges = require('../../src/constants/ranges')

test('is an object', async (t) => {

	t.true(typeof ranges === 'object')

})
'use strict'

const test = require('ava')

const referrers = require('../../src/constants/referrers')

test('is an object', async (t) => {

	t.is(typeof referrers, 'object')

})
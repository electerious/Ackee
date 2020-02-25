'use strict'

const test = require('ava')

const sizes = require('../../src/constants/sizes')

test('is an object', async (t) => {

	t.is(typeof sizes, 'object')

})
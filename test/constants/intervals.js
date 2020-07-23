'use strict'

const test = require('ava')

const intervals = require('../../src/constants/intervals')

test('is an object', async (t) => {

	t.is(typeof intervals, 'object')

})
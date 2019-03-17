'use strict'

const test = require('ava')

const day = require('../../src/utils/day')

test('return one day in milliseconds', async (t) => {

	t.is(day, 86400000)

})
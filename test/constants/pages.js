'use strict'

const test = require('ava')

const pages = require('../../src/constants/pages')

test('is an object', async (t) => {

	t.is(typeof pages, 'object')

})
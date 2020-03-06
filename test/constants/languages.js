'use strict'

const test = require('ava')

const languages = require('../../src/constants/languages')

test('is an object', async (t) => {

	t.is(typeof languages, 'object')

})
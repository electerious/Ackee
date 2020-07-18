'use strict'

const test = require('ava')

const isDevelopmentMode = require('../../src/utils/isDevelopmentMode')

test('return boolean', async (t) => {

	t.is(typeof isDevelopmentMode, 'boolean')

})
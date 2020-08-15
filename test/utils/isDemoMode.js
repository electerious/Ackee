'use strict'

const test = require('ava')

const isDemoMode = require('../../src/utils/isDemoMode')

test('return boolean', async (t) => {

	t.is(typeof isDemoMode, 'boolean')

})
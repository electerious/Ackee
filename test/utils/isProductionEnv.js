'use strict'

const test = require('ava')

const isProductionEnv = require('../../src/utils/isProductionEnv')

test('return boolean', async (t) => {

	t.is(typeof isProductionEnv, 'boolean')

})
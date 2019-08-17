'use strict'

const test = require('ava')

const isProductionEnv = require('../../src/utils/isProductionEnv')

test('return boolean', async (t) => {

	t.true(typeof isProductionEnv === 'boolean')

})
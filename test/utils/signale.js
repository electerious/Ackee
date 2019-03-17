'use strict'

const test = require('ava')
const { Signale } = require('signale')

const signale = require('../../src/utils/signale')

test('is a Signale instance', (t) => {

	t.true(signale instanceof Signale)

})
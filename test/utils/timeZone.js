'use strict'

const test = require('ava')

const timeZone = require('../../src/utils/timeZone')

test('returns timeZone', (t) => {

	new Intl.DateTimeFormat(undefined, { timeZone })
	t.pass()

})
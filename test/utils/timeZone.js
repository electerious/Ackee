'use strict'

const test = require('ava')

const timeZone = require('../../src/utils/timeZone')

test('returns timeZone', () => {

	new Intl.DateTimeFormat(undefined, { timeZone })

})
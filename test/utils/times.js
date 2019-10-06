'use strict'

const test = require('ava')

const times = require('../../src/utils/times')

test('return one second in milliseconds', async (t) => {

	t.is(times.second, 1000)

})

test('return one minute in milliseconds', async (t) => {

	t.is(times.minute, 60000)

})

test('return one hour in milliseconds', async (t) => {

	t.is(times.hour, 3600000)

})

test('return one day in milliseconds', async (t) => {

	t.is(times.day, 86400000)

})
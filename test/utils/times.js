'use strict'

const test = require('ava')

const times = require('../../src/utils/times')

test('return one second in milliseconds', (t) => {
	t.is(times.second, 1000)
})

test('return one minute in milliseconds', (t) => {
	t.is(times.minute, 60_000)
})

test('return one hour in milliseconds', (t) => {
	t.is(times.hour, 3_600_000)
})

test('return one day in milliseconds', (t) => {
	t.is(times.day, 86_400_000)
})
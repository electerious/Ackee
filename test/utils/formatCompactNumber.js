'use strict'

const test = require('ava')

const formatCompactNumber = require('../../src/utils/formatCompactNumber')

test('format numbers less than 1000 without suffix', (t) => {
	t.is(formatCompactNumber(0), '0')
	t.is(formatCompactNumber(100), '100')
	t.is(formatCompactNumber(999), '999')
})

test('format thousands with K suffix', (t) => {
	t.is(formatCompactNumber(1000), '1K')
	t.is(formatCompactNumber(1500), '1.5K')
	t.is(formatCompactNumber(10000), '10K')
	t.is(formatCompactNumber(10500), '10.5K')
	t.is(formatCompactNumber(99999), '100K')
})

test('format millions with M suffix', (t) => {
	t.is(formatCompactNumber(1000000), '1M')
	t.is(formatCompactNumber(1500000), '1.5M')
	t.is(formatCompactNumber(10000000), '10M')
	t.is(formatCompactNumber(10500000), '10.5M')
})

test('format billions with B suffix', (t) => {
	t.is(formatCompactNumber(1000000000), '1B')
	t.is(formatCompactNumber(1500000000), '1.5B')
})

test('format trillions with T suffix', (t) => {
	t.is(formatCompactNumber(1000000000000), '1T')
	t.is(formatCompactNumber(1500000000000), '1.5T')
})

test('respect maximumFractionDigits parameter', (t) => {
	// Default is 1
	t.is(formatCompactNumber(1234), '1.2K')

	// With 0 fraction digits
	t.is(formatCompactNumber(1234, 0), '1K')

	// With 2 fraction digits
	t.is(formatCompactNumber(1234, 2), '1.23K')
	t.is(formatCompactNumber(123.456, 2), '123.46')
})

test('handle decimal numbers', (t) => {
	t.is(formatCompactNumber(1234.56, 2), '1.23K')
	t.is(formatCompactNumber(123.456, 2), '123.46')
	t.is(formatCompactNumber(12.34, 2), '12.34')
})

test('handle negative numbers', (t) => {
	t.is(formatCompactNumber(-1000), '-1K')
	t.is(formatCompactNumber(-1500), '-1.5K')
	t.is(formatCompactNumber(-1000000), '-1M')
})

test('handle edge cases', (t) => {
	t.is(formatCompactNumber(999.9), '999.9')
	t.is(formatCompactNumber(999.4), '999.4')
	t.is(formatCompactNumber(1000), '1K')
	t.is(formatCompactNumber(0.1, 2), '0.1')
})
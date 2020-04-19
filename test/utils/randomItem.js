'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const randomItem = require('../../src/utils/randomItem')

test('return the only item', async (t) => {

	const arr = [ uuid() ]

	const result = randomItem(arr)

	t.is(result, arr[0])

})

test('return random item', async (t) => {

	const arr = [
		uuid(),
		uuid(),
		uuid()
	]

	const result = randomItem(arr)

	t.true(arr.includes(result))

})
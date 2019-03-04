'use strict'

const test = require('ava')
const uuid = require('uuid/v4')

const preload = require('../src/preload')

test('return response of original function', async (t) => {

	const value = uuid()
	const fn = async () => value

	const preloaded = preload(fn)
	const result = await preloaded()

	t.is(result, await fn())

})

test('execute only once', async (t) => {

	t.plan(1)

	const fn = async () => t.pass()

	const preloaded = preload(fn)

	await preloaded()
	await preloaded()

})
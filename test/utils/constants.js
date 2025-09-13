'use strict'

const test = require('ava')
const { stub, restore, useFakeTimers } = require('sinon')

const constants = require('../../src/database/constants')
const { customise } = require('../../src/utils/constants')

test.beforeEach((t) => {
	t.context = {
		...t.context,
		clock: useFakeTimers({
			now: Date.now(),
		}),
		get: stub(constants, 'get').resolves(),
	}
})
test.afterEach.always(() => {
	restore()
})

const obj = { a: 1, b: 2 }

const fetchMethodMacro = test.macro({
	exec: async (t, keys, setup) => {
		const { clock, get } = t.context
		setup({ get })
		await clock.tickAsync(5001)
		const c = customise(obj, keys)
		c.a
		c.b
		await clock.tickAsync(5001)
		c.b
		c.a
		t.is(get.callCount, keys.length * 2)
	},
	title: (providedTitle, keys) => `${ providedTitle } | fetchMethod should be called ${ keys.length * 2 } times for ${ JSON.stringify(keys) }`,
})

for (const [ title, setup ] of [
	[ 'constants.get resolves truthy', ({ get }) => get.resolves({ value: 2 }) ],
	[ 'constants.get resolves falsy', ({ get }) => get.resolves({ value: 0 }) ],
	[ 'constants.get rejects', ({ get }) => get.rejects('probably not possible in normal life') ],
]) {
	for (const keys of [
		[],
		[ 'a' ],
		[ 'b' ],
		[ 'a', 'b' ],
	]) test.serial(title, fetchMethodMacro, keys, setup)
}

test.serial('constants.get delivers undefined value', async (t) => {
	const { clock } = t.context
	const c = customise(obj, [ 'b' ])
	t.is(c.b, 2)
	await clock.tickAsync()
	t.is(c.b, 2)
	await clock.tickAsync(5001)
	t.is(c.b, 2)
})

test.serial('constants.get delivers updated value', async (t) => {
	const { clock, get } = t.context
	get.resolves({ value: 2 })
	const c = customise(obj, [ 'b' ])
	t.is(c.b, 2)
	await clock.tickAsync()
	t.is(c.b, 2)

	get.resolves({ value: 8 })
	await clock.tickAsync(5001)
	t.is(c.b, 2)
	await clock.tickAsync()
	t.is(c.b, 8)
	await clock.tickAsync(5001)
	t.is(c.b, 8)
})
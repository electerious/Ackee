'use strict'

const test = require('ava')
const listen = require('test-listen')

const server = require('../../../src/server')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase } = require('../_utils')
const { getStats } = require('./_utils')

const base = listen(server)

test.before(connectToDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)
test.after.always(disconnectFromDatabase)

const macro = async (t, variables, assertions) => {
	const limit = variables.limit == null ? '' : `, limit: ${ variables.limit }`

	const statistics = await getStats({
		base,
		token: t.context.token.id,
		eventId: t.context.event.id,
		fragment: `
			chart(type: ${ variables.type }, interval: ${ variables.interval }${ limit }) {
				id
				count
			}
		`
	})

	assertions(t, statistics.chart)
}

macro.title = (providedTitle, opts) => `fetch ${ Object.values(opts).join(' and ') } chart entries`

test(macro, {
	interval: 'DAILY',
	type: 'TOTAL'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.is(entries[0].count, 1)
})

test(macro, {
	interval: 'DAILY',
	type: 'TOTAL',
	limit: 1
}, (t, entries) => {
	t.is(entries.length, 1)
	t.is(entries[0].count, 1)
})

test(macro, {
	interval: 'MONTHLY',
	type: 'TOTAL'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.is(typeof entries[0].count, 'number')
})

test(macro, {
	interval: 'MONTHLY',
	type: 'TOTAL',
	limit: 1
}, (t, entries) => {
	t.is(entries.length, 1)
	t.is(typeof entries[0].count, 'number')
})

test(macro, {
	interval: 'YEARLY',
	type: 'TOTAL'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.is(typeof entries[0].count, 'number')
})

test(macro, {
	interval: 'YEARLY',
	type: 'TOTAL',
	limit: 1
}, (t, entries) => {
	t.is(entries.length, 1)
	t.is(typeof entries[0].count, 'number')
})

test(macro, {
	interval: 'DAILY',
	type: 'AVERAGE'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.is(entries[0].count, 1)
})

test(macro, {
	interval: 'DAILY',
	type: 'AVERAGE',
	limit: 1
}, (t, entries) => {
	t.is(entries.length, 1)
	t.is(entries[0].count, 1)
})

test(macro, {
	interval: 'MONTHLY',
	type: 'AVERAGE'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.is(typeof entries[0].count, 'number')
})

test(macro, {
	interval: 'MONTHLY',
	type: 'AVERAGE',
	limit: 1
}, (t, entries) => {
	t.is(entries.length, 1)
	t.is(typeof entries[0].count, 'number')
})

test(macro, {
	interval: 'YEARLY',
	type: 'AVERAGE'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.is(typeof entries[0].count, 'number')
})

test(macro, {
	interval: 'YEARLY',
	type: 'AVERAGE',
	limit: 1
}, (t, entries) => {
	t.is(entries.length, 1)
	t.is(typeof entries[0].count, 'number')
})
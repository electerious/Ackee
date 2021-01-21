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
			list(sorting: ${ variables.sorting }, type: ${ variables.type }, range: ${ variables.range }${ limit }) {
				id
				count
				created
			}
		`
	})

	assertions(t, statistics.list)
}

macro.title = (providedTitle, opts) => `fetch ${ Object.values(opts).join(' and ') } list entries`

test(macro, {
	sorting: 'TOP',
	type: 'TOTAL',
	range: 'LAST_6_MONTHS'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.is(entries[0].id, 'Key 14')
	t.is(entries[0].count, 14)
})

test(macro, {
	sorting: 'TOP',
	type: 'AVERAGE',
	range: 'LAST_6_MONTHS'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.is(entries[0].id, 'Key 14')
	t.is(entries[0].count, 14)
})

test(macro, {
	sorting: 'RECENT',
	type: 'TOTAL',
	range: 'LAST_6_MONTHS'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.is(entries[0].id, 'Key 1')
})

test(macro, {
	sorting: 'RECENT',
	type: 'TOTAL',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, entries) => {
	t.is(entries.length, 1)
	t.is(entries[0].id, 'Key 1')
})

test(macro, {
	sorting: 'NEW',
	type: 'TOTAL',
	range: 'LAST_6_MONTHS'
}, (t, entries) => {
	t.is(entries.length, 14)
	t.true(entries[0].id.includes('Key'))
	t.is(typeof entries[0].count, 'number')
})
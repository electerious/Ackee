'use strict'

const test = require('ava')
const listen = require('test-listen')

const server = require('../../../src/server')
const { minute } = require('../../../src/utils/times')
const { connectToDatabase, fillDatabase, cleanupDatabase, disconnectFromDatabase } = require('../_utils')
const { getStats } = require('./_utils')

const base = listen(server)

test.before(connectToDatabase)
test.after.always(disconnectFromDatabase)
test.beforeEach(fillDatabase)
test.afterEach.always(cleanupDatabase)

const macro = async (t, variables, assertions) => {
	const limit = variables.limit == null ? '' : `, limit: ${ variables.limit }`

	const statistics = await getStats({
		base,
		token: t.context.token.id,
		domainId: t.context.domain.id,
		fragment: `
			durations(interval: ${ variables.interval }${ limit }) {
				value
				count
			}
		`,
	})

	assertions(t, statistics.durations)
}

macro.title = (providedTitle, options) => `fetch ${ Object.values(options).join(' and ') } durations`

test(macro, {
	interval: 'DAILY',
}, (t, durations) => {
	t.is(durations.length, 14)
	t.is(durations[0].count, minute)
})

test(macro, {
	interval: 'DAILY',
	limit: 1,
}, (t, durations) => {
	t.is(durations.length, 1)
	t.is(durations[0].count, minute)
})

test(macro, {
	interval: 'MONTHLY',
}, (t, durations) => {
	t.is(durations.length, 14)
	t.is(durations[0].count, minute)
})

test(macro, {
	interval: 'MONTHLY',
	limit: 1,
}, (t, durations) => {
	t.is(durations.length, 1)
	t.is(durations[0].count, minute)
})

test(macro, {
	interval: 'YEARLY',
}, (t, durations) => {
	t.is(durations.length, 14)
	t.is(durations[0].count, minute)
})

test(macro, {
	interval: 'YEARLY',
	limit: 1,
}, (t, durations) => {
	t.is(durations.length, 1)
	t.is(durations[0].count, minute)
})
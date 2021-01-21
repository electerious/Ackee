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
		domainId: t.context.domain.id,
		fragment: `
			views(interval: ${ variables.interval }, type: ${ variables.type }${ limit }) {
				id
				count
			}
		`
	})

	assertions(t, statistics.views)
}

macro.title = (providedTitle, opts) => `fetch ${ Object.values(opts).join(' and ') } views`

test(macro, {
	interval: 'DAILY',
	type: 'UNIQUE'
}, (t, views) => {
	t.is(views.length, 14)
	t.is(views[0].count, 1)
})

test(macro, {
	interval: 'DAILY',
	type: 'UNIQUE',
	limit: 1
}, (t, views) => {
	t.is(views.length, 1)
	t.is(views[0].count, 1)
})

test(macro, {
	interval: 'MONTHLY',
	type: 'UNIQUE'
}, (t, views) => {
	t.is(views.length, 14)
	t.is(typeof views[0].count, 'number')
})

test(macro, {
	interval: 'MONTHLY',
	type: 'UNIQUE',
	limit: 1
}, (t, views) => {
	t.is(views.length, 1)
	t.is(typeof views[0].count, 'number')
})

test(macro, {
	interval: 'YEARLY',
	type: 'UNIQUE'
}, (t, views) => {
	t.is(views.length, 14)
	t.is(typeof views[0].count, 'number')
})

test(macro, {
	interval: 'YEARLY',
	type: 'UNIQUE',
	limit: 1
}, (t, views) => {
	t.is(views.length, 1)
	t.is(typeof views[0].count, 'number')
})

test(macro, {
	interval: 'DAILY',
	type: 'TOTAL'
}, (t, views) => {
	t.is(views.length, 14)
	t.is(views[0].count, 1)
})

test(macro, {
	interval: 'DAILY',
	type: 'TOTAL',
	limit: 1
}, (t, views) => {
	t.is(views.length, 1)
	t.is(views[0].count, 1)
})

test(macro, {
	interval: 'MONTHLY',
	type: 'TOTAL'
}, (t, views) => {
	t.is(views.length, 14)
	t.is(typeof views[0].count, 'number')
})

test(macro, {
	interval: 'MONTHLY',
	type: 'TOTAL',
	limit: 1
}, (t, views) => {
	t.is(views.length, 1)
	t.is(typeof views[0].count, 'number')
})

test(macro, {
	interval: 'YEARLY',
	type: 'TOTAL'
}, (t, views) => {
	t.is(views.length, 14)
	t.is(typeof views[0].count, 'number')
})

test(macro, {
	interval: 'YEARLY',
	type: 'TOTAL',
	limit: 1
}, (t, views) => {
	t.is(views.length, 1)
	t.is(typeof views[0].count, 'number')
})
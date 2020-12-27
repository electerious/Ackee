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
			systems(sorting: ${ variables.sorting }, type: ${ variables.type }, range: ${ variables.range }${ limit }) {
				id
				count
				created
			}
		`
	})

	assertions(t, statistics.systems)
}

macro.title = (providedTitle, opts) => `fetch ${ Object.values(opts).join(' and ') } systems`

test(macro, {
	sorting: 'TOP',
	type: 'NO_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, systems) => {
	t.is(systems.length, 1)
	t.is(systems[0].id, 'iOS')
})

test(macro, {
	sorting: 'RECENT',
	type: 'NO_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, systems) => {
	t.is(systems.length, 14)
	t.is(systems[0].id, 'iOS')
})

test(macro, {
	sorting: 'RECENT',
	type: 'NO_VERSION',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, systems) => {
	t.is(systems.length, 1)
	t.is(systems[0].id, 'iOS')
})

test(macro, {
	sorting: 'NEW',
	type: 'NO_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, systems) => {
	t.is(systems.length, 1)
	t.is(systems[0].id, 'iOS')
})

test(macro, {
	sorting: 'TOP',
	type: 'WITH_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, systems) => {
	t.is(systems.length, 2)
	t.is(systems[0].id, 'iOS 14.0')
	t.is(systems[1].id, 'iOS 13.0')
})

test(macro, {
	sorting: 'RECENT',
	type: 'WITH_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, systems) => {
	t.is(systems.length, 14)
	t.is(systems[0].id, 'iOS 14.0')
	t.is(systems[8].id, 'iOS 13.0')
})

test(macro, {
	sorting: 'RECENT',
	type: 'WITH_VERSION',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, systems) => {
	t.is(systems.length, 1)
	t.is(systems[0].id, 'iOS 14.0')
})

test(macro, {
	sorting: 'NEW',
	type: 'WITH_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, systems) => {
	t.is(systems.length, 2)
	t.is(systems[0].id, 'iOS 14.0')
	t.is(systems[1].id, 'iOS 13.0')
})
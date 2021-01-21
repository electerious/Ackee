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
			referrers(sorting: ${ variables.sorting }, type: ${ variables.type }, range: ${ variables.range }${ limit }) {
				id
				count
				created
			}
		`
	})

	assertions(t, statistics.referrers)
}

macro.title = (providedTitle, opts) => `fetch ${ Object.values(opts).join(' and ') } referrers`

test(macro, {
	sorting: 'TOP',
	type: 'WITH_SOURCE',
	range: 'LAST_6_MONTHS'
}, (t, referrers) => {
	t.is(referrers.length, 2)
	t.is(referrers[0].id, 'Newsletter')
})

test(macro, {
	sorting: 'RECENT',
	type: 'WITH_SOURCE',
	range: 'LAST_6_MONTHS'
}, (t, referrers) => {
	t.is(referrers.length, 14)
	t.is(referrers[0].id, 'https://google.com/')
})

test(macro, {
	sorting: 'RECENT',
	type: 'WITH_SOURCE',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, referrers) => {
	t.is(referrers.length, 1)
	t.is(referrers[0].id, 'https://google.com/')
})

test(macro, {
	sorting: 'NEW',
	type: 'WITH_SOURCE',
	range: 'LAST_6_MONTHS'
}, (t, referrers) => {
	t.is(referrers.length, 2)
	t.is(referrers[0].id, 'https://google.com/')
})

test(macro, {
	sorting: 'TOP',
	type: 'NO_SOURCE',
	range: 'LAST_6_MONTHS'
}, (t, referrers) => {
	t.is(referrers.length, 1)
	t.is(referrers[0].id, 'https://google.com/')
})

test(macro, {
	sorting: 'RECENT',
	type: 'NO_SOURCE',
	range: 'LAST_6_MONTHS'
}, (t, referrers) => {
	t.is(referrers.length, 14)
	t.is(referrers[0].id, 'https://google.com/')
})

test(macro, {
	sorting: 'RECENT',
	type: 'NO_SOURCE',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, referrers) => {
	t.is(referrers.length, 1)
	t.is(referrers[0].id, 'https://google.com/')
})

test(macro, {
	sorting: 'NEW',
	type: 'NO_SOURCE',
	range: 'LAST_6_MONTHS'
}, (t, referrers) => {
	t.is(referrers.length, 1)
	t.is(referrers[0].id, 'https://google.com/')
})

test(macro, {
	sorting: 'TOP',
	type: 'ONLY_SOURCE',
	range: 'LAST_6_MONTHS'
}, (t, referrers) => {
	t.is(referrers.length, 1)
	t.is(referrers[0].id, 'Newsletter')
})

test(macro, {
	sorting: 'RECENT',
	type: 'ONLY_SOURCE',
	range: 'LAST_6_MONTHS'
}, (t, referrers) => {
	t.is(referrers.length, 9)
	t.is(referrers[0].id, 'Newsletter')
})

test(macro, {
	sorting: 'RECENT',
	type: 'ONLY_SOURCE',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, referrers) => {
	t.is(referrers.length, 1)
	t.is(referrers[0].id, 'Newsletter')
})

test(macro, {
	sorting: 'NEW',
	type: 'ONLY_SOURCE',
	range: 'LAST_6_MONTHS'
}, (t, referrers) => {
	t.is(referrers.length, 1)
	t.is(referrers[0].id, 'Newsletter')
})
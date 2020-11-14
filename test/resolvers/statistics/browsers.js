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
			browsers(sorting: ${ variables.sorting }, type: ${ variables.type }, range: ${ variables.range }${ limit }) {
				id
				count
				created
			}
		`
	})

	assertions(t, statistics.browsers)
}

macro.title = (providedTitle, opts) => `fetch ${ Object.values(opts).join(' and ') } pages`

test(macro, {
	sorting: 'TOP',
	type: 'NO_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, browsers) => {
	t.is(browsers.length, 1)
	t.is(browsers[0].id, 'Safari')
})

test(macro, {
	sorting: 'RECENT',
	type: 'NO_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, browsers) => {
	t.is(browsers.length, 14)
	t.is(browsers[0].id, 'Safari')
})

test(macro, {
	sorting: 'RECENT',
	type: 'NO_VERSION',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, browsers) => {
	t.is(browsers.length, 1)
	t.is(browsers[0].id, 'Safari')
})

test(macro, {
	sorting: 'NEW',
	type: 'NO_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, browsers) => {
	t.is(browsers.length, 1)
	t.is(browsers[0].id, 'Safari')
})

test(macro, {
	sorting: 'TOP',
	type: 'WITH_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, browsers) => {
	t.is(browsers.length, 2)
	t.is(browsers[0].id, 'Safari 14.0')
	t.is(browsers[1].id, 'Safari 13.0')
})

test(macro, {
	sorting: 'RECENT',
	type: 'WITH_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, browsers) => {
	t.is(browsers.length, 14)
	t.is(browsers[0].id, 'Safari 14.0')
	t.is(browsers[8].id, 'Safari 13.0')
})

test(macro, {
	sorting: 'RECENT',
	type: 'WITH_VERSION',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, browsers) => {
	t.is(browsers.length, 1)
	t.is(browsers[0].id, 'Safari 14.0')
})

test(macro, {
	sorting: 'NEW',
	type: 'WITH_VERSION',
	range: 'LAST_6_MONTHS'
}, (t, browsers) => {
	t.is(browsers.length, 2)
	t.is(browsers[0].id, 'Safari 14.0')
	t.is(browsers[1].id, 'Safari 13.0')
})
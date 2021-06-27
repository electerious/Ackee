'use strict'

const test = require('ava')
const listen = require('test-listen')

const server = require('../../../src/server')
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
			pages(sorting: ${ variables.sorting }, range: ${ variables.range }${ limit }) {
				value
				count
				created
			}
		`,
	})

	assertions(t, statistics.pages)
}

macro.title = (providedTitle, options) => `fetch ${ Object.values(options).join(' and ') } pages`

test(macro, {
	sorting: 'TOP',
	range: 'LAST_6_MONTHS',
}, (t, pages) => {
	t.is(pages.length, 1)
	t.is(pages[0].value, 'https://example.com/')
})

test(macro, {
	sorting: 'RECENT',
	range: 'LAST_6_MONTHS',
}, (t, pages) => {
	t.is(pages.length, 14)
	t.is(pages[0].value, 'https://example.com/')
})

test(macro, {
	sorting: 'RECENT',
	range: 'LAST_6_MONTHS',
	limit: 1,
}, (t, pages) => {
	t.is(pages.length, 1)
	t.is(pages[0].value, 'https://example.com/')
})

test(macro, {
	sorting: 'NEW',
	range: 'LAST_6_MONTHS',
}, (t, pages) => {
	t.is(pages.length, 1)
	t.is(pages[0].value, 'https://example.com/')
})
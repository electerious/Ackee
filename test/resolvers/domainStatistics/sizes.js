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
			sizes(sorting: ${ variables.sorting }, type: ${ variables.type }, range: ${ variables.range }${ limit }) {
				id
				count
				created
			}
		`
	})

	assertions(t, statistics.sizes)
}

macro.title = (providedTitle, opts) => `fetch ${ Object.values(opts).join(' and ') } sizes`

test(macro, {
	sorting: 'TOP',
	type: 'BROWSER_WIDTH',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '414px')
})

test(macro, {
	sorting: 'TOP',
	type: 'BROWSER_HEIGHT',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '719px')
})

test(macro, {
	sorting: 'TOP',
	type: 'BROWSER_RESOLUTION',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '414px x 719px')
})

test(macro, {
	sorting: 'RECENT',
	type: 'BROWSER_WIDTH',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 14)
	t.is(sizes[0].id, '414px')
})

test(macro, {
	sorting: 'RECENT',
	type: 'BROWSER_HEIGHT',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 14)
	t.is(sizes[0].id, '719px')
})

test(macro, {
	sorting: 'RECENT',
	type: 'BROWSER_RESOLUTION',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 14)
	t.is(sizes[0].id, '414px x 719px')
})

test(macro, {
	sorting: 'RECENT',
	type: 'BROWSER_RESOLUTION',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, sizes) => {
	t.is(sizes.length, 1)
	t.is(sizes[0].id, '414px x 719px')
})

test(macro, {
	sorting: 'NEW',
	type: 'BROWSER_WIDTH',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '414px')
})

test(macro, {
	sorting: 'NEW',
	type: 'BROWSER_HEIGHT',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '719px')
})

test(macro, {
	sorting: 'NEW',
	type: 'BROWSER_RESOLUTION',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '414px x 719px')
})

test(macro, {
	sorting: 'TOP',
	type: 'SCREEN_WIDTH',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '414px')
})

test(macro, {
	sorting: 'TOP',
	type: 'SCREEN_HEIGHT',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '896px')
})

test(macro, {
	sorting: 'TOP',
	type: 'SCREEN_RESOLUTION',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '414px x 896px')
})

test(macro, {
	sorting: 'RECENT',
	type: 'SCREEN_WIDTH',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 14)
	t.is(sizes[0].id, '414px')
})

test(macro, {
	sorting: 'RECENT',
	type: 'SCREEN_HEIGHT',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 14)
	t.is(sizes[0].id, '896px')
})

test(macro, {
	sorting: 'RECENT',
	type: 'SCREEN_RESOLUTION',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 14)
	t.is(sizes[0].id, '414px x 896px')
})

test(macro, {
	sorting: 'RECENT',
	type: 'SCREEN_RESOLUTION',
	range: 'LAST_6_MONTHS',
	limit: 1
}, (t, sizes) => {
	t.is(sizes.length, 1)
	t.is(sizes[0].id, '414px x 896px')
})

test(macro, {
	sorting: 'NEW',
	type: 'SCREEN_WIDTH',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '414px')
})

test(macro, {
	sorting: 'NEW',
	type: 'SCREEN_HEIGHT',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '896px')
})

test(macro, {
	sorting: 'NEW',
	type: 'SCREEN_RESOLUTION',
	range: 'LAST_6_MONTHS'
}, (t, sizes) => {
	t.is(sizes.length, 2)
	t.is(sizes[0].id, '414px x 896px')
})